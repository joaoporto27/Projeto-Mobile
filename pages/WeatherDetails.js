import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../components/Gradient';

const API_KEY = '55a27d3f47e50f329fc31a3de843fbae';

export default function WeatherDetails({ route }) {
    const { cityId, cityName } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            // Buscar dados atuais do clima
            const currentResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            
            if (!currentResponse.ok) {
                throw new Error('Erro ao buscar dados do clima');
            }

            const currentData = await currentResponse.json();
            
            // Buscar previsão do tempo (5 dias com intervalos de 3h)
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            
            if (!forecastResponse.ok) {
                throw new Error('Erro ao buscar previsão do tempo');
            }

            const forecastDataResponse = await forecastResponse.json();
            
            setWeatherData(currentData);
            setForecastData(forecastDataResponse);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Processar dados de previsão por hora (próximas 24h)
    const getHourlyForecast = () => {
        if (!forecastData) return [];
        
        // Pegar as próximas 8 previsões (24 horas com intervalos de 3h)
        return forecastData.list.slice(0, 8).map(item => ({
            time: new Date(item.dt * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(item.main.temp),
            icon: item.weather[0].main,
        }));
    };

    // Processar dados de previsão semanal
    const getWeeklyForecast = () => {
        if (!forecastData) return [];
        
        const dailyData = {};
        
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString('pt-BR');
            
            if (!dailyData[dayKey]) {
                dailyData[dayKey] = {
                    date: date,
                    temps: [],
                    weatherConditions: [],
                };
            }
            
            dailyData[dayKey].temps.push(item.main.temp);
            dailyData[dayKey].weatherConditions.push(item.weather[0].main);
        });
        
        // Converter para array e calcular min/max
        return Object.values(dailyData).slice(0, 7).map(day => {
            const dayName = day.date.toLocaleDateString('pt-BR', { weekday: 'long' });
            const isToday = day.date.toDateString() === new Date().toDateString();
            
            // Pegar a condição climática mais comum do dia
            const weatherCount = {};
            day.weatherConditions.forEach(condition => {
                weatherCount[condition] = (weatherCount[condition] || 0) + 1;
            });
            const mostCommonWeather = Object.keys(weatherCount).reduce((a, b) => 
                weatherCount[a] > weatherCount[b] ? a : b
            );
            
            return {
                day: isToday ? 'Hoje' : dayName.charAt(0).toUpperCase() + dayName.slice(1),
                min: Math.round(Math.min(...day.temps)),
                max: Math.round(Math.max(...day.temps)),
                icon: mostCommonWeather,
            };
        });
    };

    if (loading) {
        return (
            <Gradient style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Carregando dados do clima...</Text>
            </Gradient>
        );
    }

    if (error) {
        return (
            <Gradient style={styles.centerContainer}>
                <Ionicons name="cloud-offline" size={64} color="#FFFFFF" />
                <Text style={styles.errorText}>{error}</Text>
            </Gradient>
        );
    }

    const hourlyForecast = getHourlyForecast();
    const weeklyForecast = getWeeklyForecast();

    return (
        <Gradient style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.cityName}>{weatherData.name}</Text>
                    <Text style={styles.country}>{weatherData.sys.country}</Text>
                </View>

                <View style={styles.mainCard}>
                    <Ionicons 
                        name={getWeatherIcon(weatherData.weather[0].main)} 
                        size={110} 
                        color="#FFFFFF" 
                    />
                    <Text style={styles.temperature}>
                        {Math.round(weatherData.main.temp)}°
                    </Text>
                    <Text style={styles.description}>
                        {weatherData.weather[0].description}
                    </Text>
                </View>

            {/* Detalhes Adicionais */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Detalhes</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailCard}>
                        <Ionicons name="thermometer-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Sensação Térmica</Text>
                        <Text style={styles.detailValue}>
                            {Math.round(weatherData.main.feels_like)}°
                        </Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Ionicons name="arrow-up-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Máxima</Text>
                        <Text style={styles.detailValue}>
                            {Math.round(weatherData.main.temp_max)}°
                        </Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Ionicons name="arrow-down-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Mínima</Text>
                        <Text style={styles.detailValue}>
                            {Math.round(weatherData.main.temp_min)}°
                        </Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Ionicons name="water-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Umidade</Text>
                        <Text style={styles.detailValue}>
                            {weatherData.main.humidity}%
                        </Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Ionicons name="speedometer-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Pressão</Text>
                        <Text style={styles.detailValue}>
                            {weatherData.main.pressure} hPa
                        </Text>
                    </View>

                    <View style={styles.detailCard}>
                        <Ionicons name="navigate-outline" size={36} color="#FFFFFF" />
                        <Text style={styles.detailLabel}>Vento</Text>
                        <Text style={styles.detailValue}>
                            {weatherData.wind.speed} m/s
                        </Text>
                    </View>
                </View>
            </View>

            {/* Previsão por Hora */}
            {hourlyForecast.length > 0 && (
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { textAlign: 'center', marginLeft: 0 }]}>Previsão por Hora</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.hourlyScrollContent, { flexGrow: 1, justifyContent: 'center' }]}
                    >
                        {hourlyForecast.map((hour, index) => (
                            <View key={index} style={styles.hourlyCard}>
                                <Text style={styles.hourlyTime}>{hour.time}</Text>
                                <Ionicons 
                                    name={getWeatherIcon(hour.icon)} 
                                    size={36} 
                                    color="#FFFFFF" 
                                    style={styles.hourlyIcon}
                                />
                                <Text style={styles.hourlyTemp}>{hour.temp}°</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Previsão Semanal */}
            {weeklyForecast.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Previsão Semanal</Text>
                    <View style={styles.weeklyContainer}>
                        {weeklyForecast.map((day, index) => (
                            <View key={index} style={styles.weeklyCard}>
                                <Text style={styles.weeklyDay}>{day.day}</Text>
                                <Ionicons 
                                    name={getWeatherIcon(day.icon)} 
                                    size={32} 
                                    color="#FFFFFF" 
                                />
                                <View style={styles.weeklyTempContainer}>
                                    <Text style={styles.weeklyTempLabel}>Mín.: {day.min}°</Text>
                                    <Text style={styles.weeklyTempLabel}>Máx.: {day.max}°</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
        </Gradient>
    );
}

const getWeatherIcon = (condition) => {
    const icons = {
        'Clear': 'sunny',
        'Clouds': 'cloudy',
        'Rain': 'rainy',
        'Drizzle': 'rainy',
        'Thunderstorm': 'thunderstorm',
        'Snow': 'snow',
        'Mist': 'cloud',
        'Smoke': 'cloud',
        'Haze': 'cloud',
        'Dust': 'cloud',
        'Fog': 'cloud',
        'Sand': 'cloud',
        'Ash': 'cloud',
        'Squall': 'cloud',
        'Tornado': 'cloud',
    };
    return icons[condition] || 'cloud';
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    errorText: {
        marginTop: 15,
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontWeight: '500',
    },
    header: {
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: 'center',
    },
    cityName: {
        fontSize: 34,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    country: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: 4,
        fontWeight: '400',
    },
    mainCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 35,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    temperature: {
        fontSize: 72,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 15,
        letterSpacing: -2,
    },
    description: {
        fontSize: 18,
        color: '#FFFFFF',
        textTransform: 'capitalize',
        marginTop: 8,
        fontWeight: '500',
        opacity: 0.95,
    },
    // Seções
    section: {
        marginTop: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 20,
        marginBottom: 12,
        letterSpacing: 0.3,
    },
    // Previsão por Hora
    hourlyScrollContainer: {
        paddingLeft: 20,
    },
    hourlyScrollContent: {
        paddingRight: 20,
    },
    hourlyCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        alignItems: 'center',
        minWidth: 75,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    hourlyTime: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
        opacity: 0.95,
    },
    hourlyIcon: {
        marginVertical: 8,
    },
    hourlyTemp: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 8,
    },
    // Previsão Semanal
    weeklyContainer: {
        paddingHorizontal: 20,
    },
    weeklyCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: 18,
        borderRadius: 18,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    weeklyDay: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        flex: 1,
        textTransform: 'capitalize',
    },
    weeklyTempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    weeklyTempLabel: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '500',
        opacity: 0.95,
    },
    // Detalhes
    detailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    detailCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: '48%',
        padding: 18,
        marginBottom: 12,
        borderRadius: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 13,
        color: '#FFFFFF',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '500',
        opacity: 0.9,
    },
    detailValue: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 6,
    },
});
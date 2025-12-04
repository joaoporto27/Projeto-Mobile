import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '55a27d3f47e50f329fc31a3de843fbae';

export default function WeatherDetails({ route }) {
    const { cityId, cityName } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=pt_br`
            );
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do clima');
            }

            const data = await response.json();
            setWeatherData(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Carregando dados do clima...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="cloud-offline" size={64} color="#999" />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.cityName}>{weatherData.name}</Text>
                <Text style={styles.country}>{weatherData.sys.country}</Text>
            </View>

            <View style={styles.mainCard}>
                <Ionicons 
                    name={getWeatherIcon(weatherData.weather[0].main)} 
                    size={100} 
                    color="#007AFF" 
                />
                <Text style={styles.temperature}>
                    {Math.round(weatherData.main.temp)}°C
                </Text>
                <Text style={styles.description}>
                    {weatherData.weather[0].description}
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailCard}>
                    <Ionicons name="thermometer" size={32} color="#007AFF" />
                    <Text style={styles.detailLabel}>Sensação Térmica</Text>
                    <Text style={styles.detailValue}>
                        {Math.round(weatherData.main.feels_like)}°C
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="arrow-up" size={32} color="#FF3B30" />
                    <Text style={styles.detailLabel}>Máxima</Text>
                    <Text style={styles.detailValue}>
                        {Math.round(weatherData.main.temp_max)}°C
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="arrow-down" size={32} color="#007AFF" />
                    <Text style={styles.detailLabel}>Mínima</Text>
                    <Text style={styles.detailValue}>
                        {Math.round(weatherData.main.temp_min)}°C
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="water" size={32} color="#007AFF" />
                    <Text style={styles.detailLabel}>Umidade</Text>
                    <Text style={styles.detailValue}>
                        {weatherData.main.humidity}%
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="speedometer" size={32} color="#007AFF" />
                    <Text style={styles.detailLabel}>Pressão</Text>
                    <Text style={styles.detailValue}>
                        {weatherData.main.pressure} hPa
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="navigate" size={32} color="#007AFF" />
                    <Text style={styles.detailLabel}>Vento</Text>
                    <Text style={styles.detailValue}>
                        {weatherData.wind.speed} m/s
                    </Text>
                </View>
            </View>
        </ScrollView>
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
        backgroundColor: '#f8f9fa',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    cityName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    country: {
        fontSize: 18,
        color: '#666',
    },
    mainCard: {
        backgroundColor: '#fff',
        margin: 20,
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    temperature: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    description: {
        fontSize: 20,
        color: '#666',
        textTransform: 'capitalize',
        marginTop: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
        paddingBottom: 30,
    },
    detailCard: {
        backgroundColor: '#fff',
        width: '45%',
        padding: 20,
        marginBottom: 15,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
});
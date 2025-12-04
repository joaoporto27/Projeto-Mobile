import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import CityCard from '../components/CityCard';
import FloatButton from '../components/FloatButton';

const API_KEY = '55a27d3f47e50f329fc31a3de843fbae';

export default function Listagem({ navigation }) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // IDs das cidades na API OpenWeatherMap
    const cityIds = [
        { id: 3467865, name: 'Campinas', description: 'Minha localização - Casa' },
        { id: 3448439, name: 'São Paulo', description: 'Trabalho' },
        { id: 3451190, name: 'Rio de Janeiro', description: 'Férias' },
    ];

    useEffect(() => {
        fetchCitiesWeather();
    }, []);

    const fetchCitiesWeather = async () => {
        try {
            setLoading(true);
            const promises = cityIds.map(city =>
                fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${API_KEY}&units=metric&lang=pt_br`)
                    .then(res => res.json())
                    .then(data => ({
                        id: city.id,
                        uri: getWeatherImage(data.weather[0].main),
                        cityName: data.name,
                        locationDesc: city.description,
                        state: data.weather[0].description,
                        temp: Math.round(data.main.temp).toString(),
                        minMaxTemp: {
                            max: Math.round(data.main.temp_max).toString(),
                            min: Math.round(data.main.temp_min).toString()
                        }
                    }))
            );

            const citiesData = await Promise.all(promises);
            setCities(citiesData);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar dados do clima');
            setLoading(false);
            Alert.alert('Erro', 'Não foi possível carregar os dados do clima');
        }
    };

    const getWeatherImage = (condition) => {
        const images = {
            'Clear': 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400&h=200&fit=crop',
            'Clouds': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=200&fit=crop',
            'Rain': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=200&fit=crop',
            'Drizzle': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=200&fit=crop',
            'Thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=200&fit=crop',
            'Snow': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=200&fit=crop',
            'Mist': 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=400&h=200&fit=crop',
        };
        return images[condition] || 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop';
    };

    const handleCityPress = (city) => {
        navigation.navigate('WeatherDetails', {
            cityId: city.id,
            cityName: city.cityName
        });
    };

    const handleAddCity = () => {
        Alert.alert(
            'Adicionar Cidade',
            'Funcionalidade em desenvolvimento',
            [{ text: 'OK' }]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Carregando cidades...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchCitiesWeather}>
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tela de Listagem</Text>
                <Text style={styles.subtitle}>Minhas cidades favoritas</Text>
            </View>
            
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {cities.map((city) => (
                    <TouchableOpacity
                        key={city.id}
                        onPress={() => handleCityPress(city)}
                        activeOpacity={0.8}
                    >
                        <CityCard
                            uri={city.uri}
                            cityName={city.cityName}
                            locationDesc={city.locationDesc}
                            state={city.state}
                            temp={city.temp}
                            minMaxTemp={city.minMaxTemp}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FloatButton onPress={handleAddCity} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    loadingContainer: {
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
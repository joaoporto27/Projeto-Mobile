import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CityCard from '../components/CityCard';
import FloatButton from '../components/FloatButton';

export default function Listagem({ navigation }) {
    const [cities, setCities] = useState([
        {
            id: 1,
            uri: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop",
            cityName: "Campinas",
            locationDesc: "Minha localização - Casa",
            state: "Nublado",
            temp: "19",
            minMaxTemp: { max: "22", min: "16" },
        },
        {
            id: 2,
            uri: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=200&fit=crop",
            cityName: "São Paulo",
            locationDesc: "Trabalho",
            state: "Ensolarado",
            temp: "25",
            minMaxTemp: { max: "28", min: "20" },
        },
    ]);

    return (
        <View style={styles.container}>
            <Text>Esta é a tela de Listagem.</Text>
            {cities.map((city) => (
                <CityCard
                    key={city.id}
                    uri={city.uri}
                    cityName={city.cityName}
                    locationDesc={city.locationDesc}
                    state={city.state}
                    temp={city.temp}
                    minMaxTemp={city.minMaxTemp}
                />
            ))}
            <FloatButton
                onPress={() => Alert.alert('Adicionar nova cidade')}
                buttonStyle={{ backgroundColor: '#007bff' }}
                textStyle={{ color: '#fff', fontSize: 28 }}
            >
                +
            </FloatButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
});
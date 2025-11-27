import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CityCard from '../components/CityCard';
import { Ionicons } from '@expo/vector-icons';

export default function Listagem({ navigation }) {
    const [cities, setCities] = useState([{

    }]);

    return (
        <View style={styles.container}>
            <Text>Esta é a tela de Listagem.</Text>
            <CityCard
                uri="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop"
                cityName="Campinas"
                locationDesc="Minha localização - Casa"
                state="Nublado"
                temp="19"
                minMaxTemp={{ max: "22", min: "16" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
});
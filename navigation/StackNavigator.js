import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../pages/HomeScreen';
import DetailsScreen from '../pages/DetailsScreen';
import Contato from '../pages/Contato';
import Weather from '../pages/Weather';
import WeatherDetails from '../pages/WeatherDetails';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Início',
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent('drawer').openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: 'Detalhes',
          headerShown: true, 
        }}
      />

      <Stack.Screen
        name="Contato"
        component={Contato}
        options={{
          title: 'Contato',
          headerShown: true, 
        }}
      />

      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{
          title: 'Clima',
          headerShown: true, 
        }}
      />

      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{
          title: 'Detalhes do Clima',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
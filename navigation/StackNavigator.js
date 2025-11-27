import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../pages/HomeScreen';
import DetailsScreen from '../pages/DetailsScreen';

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
        headerShown: false, // Headers controlados individualmente por tela
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Início',
          headerShown: true,
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
          headerShown: true, // Mostrar header nas telas internas
        }}
      />
    </Stack.Navigator>
  );
}
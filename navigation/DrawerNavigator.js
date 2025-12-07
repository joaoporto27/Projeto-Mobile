import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from './StackNavigator';
import Listagem from '../pages/listagem';
import WeatherDetails from '../pages/WeatherDetails';

const Drawer = createDrawerNavigator();
const ListagemStack = createNativeStackNavigator();

// Stack Navigator para a tela de Listagem
function ListagemStackNavigator() {
  return (
    <ListagemStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ListagemStack.Screen
        name="ListagemHome"
        component={Listagem}
        options={{
          headerShown: false, // O header será mostrado pelo Drawer
        }}
      />
      <ListagemStack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{
          title: 'Detalhes do Clima',
          headerShown: true,
        }}
      />
    </ListagemStack.Navigator>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f4f4f4',
          width: 240,
        },
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#333',
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false, // Esconder header do drawer para usar o do stack
        }}
      />
      <Drawer.Screen
        name="Listagem"
        component={ListagemStackNavigator}
        options={{
          drawerLabel: 'Listagem',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerTitle: 'Listagem',
        }}
      />
    </Drawer.Navigator>
  );
}
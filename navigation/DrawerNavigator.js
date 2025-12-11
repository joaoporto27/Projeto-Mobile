import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from './StackNavigator';
import Listagem from '../pages/listagem';
import WeatherDetails from '../pages/WeatherDetails';
import Contato from '../pages/Contato';

const Drawer = createDrawerNavigator();
const ListagemStack = createNativeStackNavigator();

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
          headerShown: false, 
        }}
      />
      <ListagemStack.Screen
        name="WeatherDetails"
        component={WeatherDetails}
        options={{
          headerShown: false,
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
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Favoritos"
        component={ListagemStackNavigator}
        options={{
          drawerLabel: 'Favoritos',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Contato"
        component={Contato}
        options={{
          drawerLabel: 'Contato',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbox" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
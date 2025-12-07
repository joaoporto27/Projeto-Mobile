import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../components/Gradient';

export default function HomeScreen({ navigation }) {
  return (
    <Gradient style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao App!</Text>
        <Text style={styles.subtitle}>
          Esta é a tela inicial do aplicativo
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DetailsScreen')}
        >
          <Text style={styles.buttonText}>Ir para Detalhes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.getParent().navigate('Listagem')}
        >
          <Text style={styles.buttonText}>Ir para Listagem</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Contato')}
        >
          <Text style={styles.buttonText}>Ir para Contato</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Weather')}
        >
          <Text style={styles.buttonText}>Ir para Clima</Text>
        </TouchableOpacity>
      </View>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#e6f0f2',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
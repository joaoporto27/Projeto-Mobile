import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Weather() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Clima</Text>
      <Text style={styles.text}>Informações meteorológicas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});
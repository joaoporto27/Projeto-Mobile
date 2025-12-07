import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Gradient from '../components/Gradient';

export default function Weather() {
  return (
    <Gradient style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Tela de Clima</Text>
        <Text style={styles.text}>Informações meteorológicas</Text>
      </View>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
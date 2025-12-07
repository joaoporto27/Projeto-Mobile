import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../components/Gradient';

const Contato = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEnviarMensagem = () => {
    if (!nomeCompleto || !email || !mensagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    Alert.alert(
      'Sucesso',
      'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      [
        {
          text: 'OK',
          onPress: () => {
            setNomeCompleto('');
            setEmail('');
            setMensagem('');
          }
        }
      ]
    );
  };

  return (
    <Gradient style={styles.gradient}>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {/* Header do navigator já controla o título; manter conteúdo do formulário abaixo */}

          <View style={styles.formContainer}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mensagem</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={mensagem}
                onChangeText={setMensagem}
                placeholder="Digite sua mensagem"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={styles.enviarButton}
              onPress={handleEnviarMensagem}
            >
              <Text style={styles.enviarButtonText}>Enviar Mensagem</Text>
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="cloud-outline" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="sunny-outline" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="menu-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  enviarButton: {
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  enviarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  iconButton: {
    padding: 8,
  },
});

export default Contato;
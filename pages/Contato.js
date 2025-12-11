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

const Contato = ({ navigation }) => {
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

  const openMenu = () => {
    console.log('Tentando abrir drawer...');
    try {
      navigation.openDrawer();
      console.log('Drawer aberto com sucesso');
    } catch (error) {
      console.error('Erro ao abrir drawer:', error);
    }
  };

  return (
    <Gradient 
      style={styles.gradient}
      colors={['#d6f1ff', '#bce6ff', '#8fd3ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Contato</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.iconButtonHeader} 
              onPress={() => {
                console.log('Botão pressionado');
                openMenu();
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={28} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c3d5a',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButtonHeader: {
    marginLeft: 12,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: '92%',
    maxWidth: 640,
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
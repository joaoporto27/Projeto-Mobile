import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gradient from '../components/Gradient';
import CityCard from '../components/CityCard';

const API_KEY = '55a27d3f47e50f329fc31a3de843fbae';

const cityIds = [
  { id: 3467865, name: 'Campinas', description: 'Minha localização - Casa' },
  { id: 2643743, name: 'Londres', description: 'Viagem' },
  { id: 5128581, name: 'New York', description: 'Agenda' },
  { id: 3117735, name: 'Madri', description: 'Família' },
  { id: 3448439, name: 'São Paulo', description: 'Trabalho' },
  { id: 3451190, name: 'Rio de Janeiro', description: 'Férias' },
  { id: 2988507, name: 'Paris', description: 'Romântico' },
  { id: 2747939, name: 'Dubai', description: 'Negócios' },
  { id: 1273294, name: 'Délhi', description: 'Exploração' },
  { id: 1850144, name: 'Tóquio', description: 'Cultura' },
  { id: 1852995, name: 'Bangkok', description: 'Relaxo' },
];

export default function HomeScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCitiesWeather();
  }, []);

  const fetchCitiesWeather = async () => {
    try {
      setLoading(true);
      const promises = cityIds.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${API_KEY}&units=metric&lang=pt_br`,
        )
          .then((res) => res.json())
          .then((data) => ({
            id: city.id,
            uri: getWeatherImage(data.weather?.[0]?.main),
            cityName: data.name || city.name,
            country: data.sys?.country || '',
            locationDesc: city.description,
            state: data.weather?.[0]?.description || 'Clima indisponivel',
            temp: Math.round(data.main?.temp ?? 0).toString(),
            minMaxTemp: {
              max: Math.round(data.main?.temp_max ?? 0).toString(),
              min: Math.round(data.main?.temp_min ?? 0).toString(),
            },
          })),
      );

      const citiesData = await Promise.all(promises);
      setCities(citiesData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados do clima');
      Alert.alert('Erro', 'Não foi possível carregar os dados do clima');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherImage = (condition) => {
    const images = {
      Clear:
        'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=400&h=200&fit=crop',
      Clouds:
        'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=200&fit=crop',
      Rain:
        'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=200&fit=crop',
      Drizzle:
        'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=200&fit=crop',
      Thunderstorm:
        'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=200&fit=crop',
      Snow:
        'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&h=200&fit=crop',
      Mist:
        'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=400&h=200&fit=crop',
    };
    return (
      images[condition] ||
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop'
    );
  };

  const handleCityPress = (city) => {
    navigation.navigate('WeatherDetails', {
      cityId: city.id,
      cityName: city.cityName,
    });
  };

  const goToListagem = () => {
    navigation.getParent()?.navigate('Listagem');
  };

  const openMenu = () => {
    navigation.getParent()?.openDrawer?.();
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando cidades...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCitiesWeather}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cities.map((city) => (
          <TouchableOpacity key={city.id} onPress={() => handleCityPress(city)} activeOpacity={0.85}>
            <CityCard
              uri={city.uri}
              cityName={city.cityName}
              locationDesc={city.locationDesc}
              state={city.state}
              temp={city.temp}
              minMaxTemp={city.minMaxTemp}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <Gradient
      style={styles.container}
      colors={['#d6f1ff', '#bce6ff', '#8fd3ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Tempo</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={openMenu}>
            <Ionicons name="menu" size={28} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {renderContent()}
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c3d5a',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1c3d5a',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
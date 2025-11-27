import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Weather = () => {
  const [selectedHour, setSelectedHour] = useState(2);

  const hourlyData = [
    { time: 'Now', temp: '29°', icon: 'partly-sunny' },
    { time: '21:00', temp: '29°', icon: 'partly-sunny' },
    { time: '22:00', temp: '26°', icon: 'partly-sunny' },
    { time: '23:00', temp: '27°', icon: 'partly-sunny' },
    { time: '00:00', temp: '23°', icon: 'partly-sunny' },
    { time: '01:00', temp: '20°', icon: 'moon' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0B1426', '#1C3A56', '#2a9d8f']}
        locations={[0, 0.4, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.dateText}>Wednesday, July 22</Text>
            <Text style={styles.locationText}>San Francisco, CA</Text>
          </View>

          {/* Main Weather Info */}
          <View style={styles.mainWeatherContainer}>
            <View style={styles.weatherIcon}>
              <Ionicons name="partly-sunny" size={120} color="#FFFFFF" />
            </View>
            <Text style={styles.conditionText}>Partly Cloudy</Text>
            <Text style={styles.temperatureText}>27°</Text>
          </View>

          {/* Weather Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>3 m/s</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>70%</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Atm pressure</Text>
              <Text style={styles.detailValue}>756 mmHg</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Water</Text>
              <Text style={styles.detailValue}>23°</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Moonrise</Text>
              <Text style={styles.detailValue}>22:48</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Moonset</Text>
              <Text style={styles.detailValue}>20:26</Text>
            </View>
          </View>

          {/* Hourly Forecast */}
          <View style={styles.hourlyContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.hourlyScroll}
            >
              {hourlyData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.hourlyItem,
                    selectedHour === index && styles.hourlyItemSelected
                  ]}
                  onPress={() => setSelectedHour(index)}
                >
                  <Text style={styles.hourlyTime}>{item.time}</Text>
                  <Ionicons name={item.icon} size={24} color="#FFFFFF" />
                  <Text style={styles.hourlyTemp}>{item.temp}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Bottom Action Buttons */}
          <View style={styles.bottomContainer}>
            <LinearGradient
              colors={['#00C851', '#007E33']}
              style={styles.actionButton}
            >
              <TouchableOpacity style={styles.actionButtonInner}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>

            <View style={styles.centerDots}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
            </View>

            <LinearGradient
              colors={['#00C851', '#007E33']}
              style={styles.actionButton}
            >
              <TouchableOpacity style={styles.actionButtonInner}>
                <Ionicons name="settings" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    marginBottom: 30,
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  locationText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  weatherIcon: {
    marginBottom: 10,
  },
  conditionText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 72,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  hourlyContainer: {
    marginBottom: 30,
  },
  hourlyScroll: {
    paddingVertical: 10,
  },
  hourlyItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    minWidth: 60,
  },
  hourlyItemSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  hourlyTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  hourlyTemp: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginBottom: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  actionButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
});

export default Weather;
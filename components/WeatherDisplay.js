import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';
import { colors, spacing, typography } from '../styles/theme';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cityName}>
          {weatherData.name}, {weatherData.sys?.country}
        </Title>
        
        <View style={styles.mainWeatherInfo}>
          <Image 
            source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }} 
            style={styles.weatherIcon} 
          />
          <Title style={styles.temperature}>
            {Math.round(weatherData.main.temp)}°C
          </Title>
        </View>
        
        <Text style={styles.description}>
          {weatherData.weather[0].description}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind Speed</Text>
            <Text style={styles.detailValue}>{Math.round(weatherData.wind.speed * 3.6)} km/h</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: spacing.md,
    borderRadius: 15,
    backgroundColor: colors.cardBackground,
    elevation: 4,
  },
  cityName: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  mainWeatherInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginRight: spacing.md,
  },
  temperature: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginBottom: spacing.lg,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: spacing.md,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default WeatherDisplay; 
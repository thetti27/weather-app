import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors, spacing, typography } from './styles/theme';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Loading from './components/Loading';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1b6890dd369340755b4a2b018388d6b6`
      );
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'City not found');
        setWeatherData(null);
      }
    } catch (error) {
      setError('Failed to fetch weather data. Please check your internet connection.');
      setWeatherData(null);
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <View style={styles.content}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
          />
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {isLoading ? (
            <Loading />
          ) : (
            <WeatherDisplay weatherData={weatherData} />
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: colors.error,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    ...typography.body,
  },
}); 
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { colors, spacing } from '../styles/theme';

const SearchBar = ({ value, onChangeText, onSearch }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search city..."
        onChangeText={onChangeText}
        value={value}
        style={styles.searchBar}
        inputStyle={styles.input}
        iconColor={colors.primary}
      />
      <Button
        mode="contained"
        onPress={onSearch}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  searchBar: {
    flex: 1,
    marginRight: spacing.sm,
    backgroundColor: colors.cardBackground,
  },
  input: {
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    color: colors.cardBackground,
  },
});

export default SearchBar; 
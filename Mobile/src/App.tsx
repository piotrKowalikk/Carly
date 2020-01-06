import React from 'react';
import { StyleSheet, View } from 'react-native';

import CarsList from './CarsList';

export default function App() {
  return (
    <View style={styles.container}>
      <CarsList></CarsList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

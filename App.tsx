import React from 'react';
import AppContainer from './src/screens';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }} >
      <AppContainer />
    </View>
  );
}
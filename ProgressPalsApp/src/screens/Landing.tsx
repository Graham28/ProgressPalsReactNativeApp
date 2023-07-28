// /screens/Landing.tsx

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Landing() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Button title="Sign Up" onPress={() => { /* Navigate to Sign Up screen */ }} />
      <Button title="Login" onPress={() => { /* Navigate to Login screen */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Landing;
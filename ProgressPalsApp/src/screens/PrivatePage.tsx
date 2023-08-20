import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StreakForm from '../components/StreakForm';

function PrivatePage() {
  return (
    <View style={styles.container}>
        <StreakForm />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivatePage;

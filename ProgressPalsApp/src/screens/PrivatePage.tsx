import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function PrivatePage() {
  return (
    <View style={styles.container}>
      <Text>This is a private page. Only logged-in users can see this.</Text>
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

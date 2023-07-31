// src/screens/ProtectedPage.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ProtectedPage: undefined;  // If you don't have any params for this screen
  // Add other screens here like
  // AnotherScreen: { param1: string; param2: number; }
};

type ProtectedPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProtectedPage'>;
type ProtectedPageRouteProp = RouteProp<RootStackParamList, 'ProtectedPage'>;

type Props = {
  navigation: ProtectedPageScreenNavigationProp;
  route: ProtectedPageRouteProp;
};

function ProtectedPage({ navigation }:Props) {
    return (
        <View style={styles.container}>
            <Text>Welcome to the protected page!</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
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

export default ProtectedPage;

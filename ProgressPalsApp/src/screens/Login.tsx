// src/screens/Login.tsx
import { loginUser } from '../api/userAPI';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password);
            if (response.token) {
                console.log("Logged in successfully with token:", response.token);
                // You may want to navigate the user to a dashboard or save the token to AsyncStorage etc.
            } else if (response.message) {
                console.error(response.message);  // handle incorrect username/password
            } else {
                console.error("Unexpected response from the server.");
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
});

export default Login;

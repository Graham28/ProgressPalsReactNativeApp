// src/screens/SignUp.tsx

import { registerUser } from '../api/userAPI';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

type Gender = 0 | 1 | 2 | undefined;

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState<Gender>(undefined);
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [displayUsername, setDisplayUsername] = useState('');
    const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);

    const openGenderPicker = () => setIsGenderPickerVisible(true);

    const selectGender = (value: Gender) => {
        setGender(value);
        setIsGenderPickerVisible(false);
    };

    const getGenderText = (gender: Gender) => {
        switch (gender) {
            case 0: return 'Male';
            case 1: return 'Female';
            case 2: return 'Other';
            default: return 'Select Gender';
        }
    };

    const handleSignUp = async () => {
        try {
            const user = { 
                email, 
                password,
                name,
                birthdate,
                displayUsername,
                gender,
            };

            const response = await registerUser(user);
            console.log(response); // or handle the response as needed
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
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
            <TouchableOpacity onPress={openGenderPicker} style={styles.input}>
                <Text>{getGenderText(gender)}</Text>
            </TouchableOpacity>
            <Modal
                visible={isGenderPickerVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => selectGender(0)}>
                        <Text>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectGender(1)}>
                        <Text>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectGender(2)}>
                        <Text>Other</Text>
                    </TouchableOpacity>
                    <Button title="Cancel" onPress={() => setIsGenderPickerVisible(false)} />
                </View>
            </Modal>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Birthdate (YYYY-MM-DD)"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
            />
            <TextInput
                placeholder="Display Username"
                value={displayUsername}
                onChangeText={setDisplayUsername}
                style={styles.input}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignUp;

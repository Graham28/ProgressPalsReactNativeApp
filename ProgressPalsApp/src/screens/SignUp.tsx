// src/screens/SignUp.tsx

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet,  Modal, TouchableOpacity} from 'react-native';

function SignUp() {
    type Gender = 'male' | 'female' | 'other' | null;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState<Gender>(null);
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [displayUsername, setDisplayUsername] = useState('');
    const [isGenderPickerVisible, setIsGenderPickerVisible] = useState(false);
    
    const openGenderPicker = () => {
        setIsGenderPickerVisible(true);
    };

    const selectGender = (value: Gender) => {
        setGender(value);
        setIsGenderPickerVisible(false);
    };
    const handleSignUp = () => {
        // Handle your sign up logic here
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
                <Text>{gender || "Select Gender"}</Text>
            </TouchableOpacity>
            
            <Modal
                visible={isGenderPickerVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => selectGender('male')}>
                        <Text>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectGender('female')}>
                        <Text>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectGender('other')}>
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

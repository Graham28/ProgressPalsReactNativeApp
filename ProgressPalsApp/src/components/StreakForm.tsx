import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const StreakForm = () => {
    const [title, setTitle] = useState('');
    const [daysCompleted, setDaysCompleted] = useState('0');

    const handleSubmit = () => {
        setTitle('');
        setDaysCompleted('0');
    };

    return (
        <View style={formStyles.container}>
            <Text style={formStyles.label}>Streak Name:</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={formStyles.input}
                placeholder="Enter Streak Name"
            />

            <Text style={formStyles.label}>Days Already Completed:</Text>
            <TextInput
                value={daysCompleted}
                onChangeText={setDaysCompleted}
                keyboardType="numeric"
                style={formStyles.input}
                placeholder="0"
            />

            <View style={formStyles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} color="#112A46" />
            </View>
        </View>
    );
};

const formStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderRadius: 10,
        padding: 20,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#C5E6DB',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.12,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#112A46',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#112A46',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 8,
        borderRadius: 5,
        fontSize: 16,
        color: '#112A46',
        fontWeight: '500',
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 5,
        overflow: 'hidden', // For proper borderRadius effect
    },
});

export default StreakForm;

// src/screens/Profile.tsx
import Post from '../components/Post'; 

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Streak, { StreakProps } from '../components/Streak';
import { ScrollView, Text, Image, Button, StyleSheet } from 'react-native';

const samplePosts = [
    { 
        id: '1', 
        content: 'My pushup progress', 
        metric: {
            title: "Max pushups",
            dataPoints: [
                { date: '14/07/2023', value: 17 },
                { date: '18/07/2023', value: 18 },
                { date: '22/07/2023', value: 19 },
                { date: '28/07/2023', value: 20 },
                { date: '04/08/2023', value: 21 },
                { date: '08/08/2023', value: 25 },
            ]
        }  
    },
    { 
        id: '2', 
        content: 'Got the steps in again today 💪',
        streak: {
            title: "30 minutes of working on app",
            unit: "days",
            streakLength: 3
        }
    },
    { 
        id: '3', 
        content: 'Progress update: Doing great today too.', 
        imageUrl: 'https://cdn.sanity.io/images/dm4o0ui7/production/020932a6ddb00f27b114b5f9b9d390e7f25d345c-1080x540.png?w=900&h=450&auto=format' },
    
];

const Profile = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('Profile must be used within an AuthProvider');
    }

    const { loginDetails } = authContext;

    return (
        <ScrollView style={styles.container}>
            <Image 
                style={styles.profileImage}
                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }}
            />
            <Text style={styles.username}>{loginDetails?.UserIdentifier || 'Username'}</Text>
            <Button title="Edit" onPress={() => { /* Edit functionality */ }} />
            {samplePosts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileImage: {
        alignSelf: 'center', // Center the image horizontally
        width: 100,
        height: 100,
        borderRadius: 50, 
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center', // Center the username horizontally
    },
});


export default Profile;

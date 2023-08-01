// src/components/Post.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type PostProps = {
    content: string;
    username?: string; 
    timestamp?: string;
};

const Post: React.FC<PostProps> = ({ content, username = 'Anonymous', timestamp = '', imageUrl }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    style={styles.profileImage}
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} 
                />
                <View style={styles.headerText}>
                    <Text style={styles.username}>{username}</Text>
                    {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
                </View>
            </View>
            <Text style={styles.text}>{content}</Text>
            
            {imageUrl && ( // Render image only if imageUrl is provided
                <Image 
                    style={styles.contentImage}
                    source={{ uri: imageUrl }}  
                />
            )}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 4,  // Reduced space between posts
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImage: {
        width: 30, 
        height: 30,
        borderRadius: 15,  // Adjusted to half of the width/height
        marginRight: 5,
    },
    headerText: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 12,
        color: '#777',
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
    contentImage: { 
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        paddingTop: 2,  // Reduced space above the action buttons
        justifyContent: 'space-between',
    },
    actionButton: {
        padding: 0,  // Reduced padding for the action buttons
    },
    actionText: {
        fontSize: 14,
        color: '#333',
    },
});


export default Post;

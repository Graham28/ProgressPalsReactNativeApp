// src/components/Post.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Streak, { StreakProps } from './Streak';
import Metric, { MetricProps } from './Metric'; 

type PostProps = {
    content: string;
    username?: string;
    timestamp?: string;
    imageUrl?: string;
    streak?: StreakProps; // Using the exported StreakProps here
    metric?: MetricProps;
};

type EmojiLinks = {
    [key: string]: string;
};

type EmojiKey = 'strong' | 'clap' | 'fire' | 'thinking';

const outlineEmojiLinks = {
    strong: 'https://static-00.iconduck.com/assets.00/flexed-biceps-emoji-475x512-9lifvcz8.png',
    clap: 'https://image.emojipng.com/183/416183-small.png',
    fire: 'https://www.vhv.rs/dpng/d/421-4212217_clipart-flames-outline-clipart-flames-outline-transparent-flame.png',
    thinking: 'https://cdn3.iconfinder.com/data/icons/smileys-people-smiley-essential/48/v-35-512.png'
};

const colorfulEmojiLinks = {
    strong: 'https://image.emojipng.com/498/172498-small.png',
    clap: 'https://image.emojipng.com/462/12436462-small.png',
    fire: 'https://image.emojipng.com/401/46401-small.png',
    thinking: 'https://image.emojipng.com/774/1774-small.png'
};


const Post: React.FC<PostProps> = ({ content, username = 'Anonymous', timestamp = '', imageUrl, streak, metric }) => {

    const [activeEmojis, setActiveEmojis] = useState<Record<string, boolean>>({});
    const toggleEmoji = (emojiKey: string) => {
        setActiveEmojis(prev => ({
            ...prev,
            [emojiKey]: !prev[emojiKey]
        }));
    };
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
            {streak && <Streak {...streak} />}

            {metric && <Metric {...metric} />}

            {imageUrl && ( // Render image only if imageUrl is provided
                <Image 
                    style={styles.contentImage}
                    source={{ uri: imageUrl }}  
                />
            )}
            
            <View style={styles.actions}>
                {Object.keys(outlineEmojiLinks).map((key) => {
                    const emojiKey = key as EmojiKey;
                    return (
                        <TouchableOpacity key={emojiKey} style={styles.emojiButton} onPress={() => toggleEmoji(emojiKey)}>
                            <Image source={{ uri: activeEmojis[emojiKey] ? colorfulEmojiLinks[emojiKey] : outlineEmojiLinks[emojiKey] }} style={styles.emojiImage} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    profileImage: {
        width: 30, 
        height: 30,
        borderRadius: 15,
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
        marginVertical: 6,
    },
    contentImage: { 
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        paddingTop: 2,
        justifyContent: 'space-between',
    },
    emojiButton: {
        marginHorizontal: 5,
    },
    emojiImage: {
        width: 15,
        height: 17,
    },
});

export default Post;

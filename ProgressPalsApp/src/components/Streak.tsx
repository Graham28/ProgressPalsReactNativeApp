import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type StreakProps = {
    title: string;
    unit: string;
    streakLength: number;
};

const Streak: React.FC<StreakProps> = ({ title, unit, streakLength }) => {
    const calculateProgress = () => {
        if (streakLength < 3) return streakLength / 3;
        if (streakLength < 7) return streakLength / 7;
        if (streakLength < 31) return streakLength / 31;
        if (streakLength < 50) return streakLength / 50;
        if (streakLength < 100) return streakLength / 100;
        return 1;  // Full progress
    };

    const progressBarFlexValue = calculateProgress();

    return (
        <View style={streakStyles.container}>
            <View>
                <Text style={streakStyles.title}>{title}</Text>
                <Text style={streakStyles.subtitle}>{`${streakLength} days of 7 ${unit} target`}</Text>
            </View>
            <View style={streakStyles.progressBarContainer}>
                <View style={[streakStyles.progressBar, { flex: progressBarFlexValue }]} />
                <Text style={[streakStyles.progressEmoji, { left: `${calculateProgress() * 100}%` }]}>🏃‍♀️</Text>
            </View>
        </View>
    );
}

const streakStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,    // Soft rounded edges
        padding: 20,         // Increased padding for spacious feel
        paddingBottom: 40,   // More space for the progress bar
        marginTop: 15,
        marginBottom: 10,    // Some margin at the bottom so the shadow isn't cut off
        backgroundColor: '#C5E6DB',  // Light background complementary to the gradient

        // Shadow properties for floating effect
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,        // More vertical offset for the shadow
        },
        shadowOpacity: 0.12,  // Slightly softer shadow
        shadowRadius: 3.84,   
        elevation: 5,        // Elevation for Android
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#112A46',
    },
    subtitle: {
        fontSize: 16,
        color: '#112A46',
        marginTop: 5, // Give some space between the title and subtitle
        fontWeight: '500',
    },
    detail: {
        fontSize: 22,
        color: '#112A46',
        fontWeight: '600',
    },
    progressBarContainer: {
        position: 'absolute',
        bottom: 20, 
        left: 20,  
        right: 20,
        height: 10, 
        flexDirection: 'row',  
        backgroundColor: '#E0E0E0',
        borderRadius: 5,  

        // Reduced shadow properties for the inner progress bar
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1.21,
        elevation: 2,
    },
    
    progressBar: {
        height: 10,
        borderRadius: 5,  
        backgroundColor: '#112A46',
    },
    progressEmoji: {
        position: 'absolute',
        bottom: -11,           
        fontSize: 30,          
        transform: [{ translateX: -18 },{ scaleX: -1 }],
    },   
});

export default Streak;

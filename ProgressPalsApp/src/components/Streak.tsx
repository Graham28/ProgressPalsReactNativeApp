import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type StreakProps = {
    title: string;
    unit: string;
    streakLength: number;
};

const Streak: React.FC<StreakProps> = ({ title, unit, streakLength }) => {
    const isCurrentUser = true;
    const lastUpdatedDate = new Date();
    lastUpdatedDate.setDate(lastUpdatedDate.getDate() - 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = 0;

    const canUpdate = isCurrentUser && today > lastUpdatedDate;
    const calculateProgress = () => {
        const milestones = [3, 7, 31, 50, 100, 182, 365];
        for (let milestone of milestones) {
            if (streakLength < milestone) {
                target = milestone;
                return streakLength / milestone;
            }
        }
        return 1;
    };

    const progressBarFlexValue = calculateProgress();
    const [showOptions, setShowOptions] = useState(false);

    return (
        <View style={streakStyles.container}>
            <View>
                <Text style={streakStyles.title}>{title}</Text>
                <Text style={streakStyles.subtitle}>{`${streakLength} days of ${target} day target`}</Text>
            </View>
            <View style={streakStyles.progressBarContainer}>
                <View style={[streakStyles.progressBar, { flex: progressBarFlexValue }]} />
                <Text style={[streakStyles.progressEmoji, { left: `${calculateProgress() * 100}%` }]}>🏃‍♀️</Text>
            </View>
            {canUpdate && (
                    <View style={streakStyles.buttonContainer}>
                        <TouchableOpacity style={streakStyles.button} onPress={() => { /* Logic to end the streak can go here */ }}>
                            <Text style={streakStyles.buttonText}>Reset 🌱</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={streakStyles.button} onPress={() => { /* Logic to add a day can go here */ }}>
                            <Text style={streakStyles.buttonText}>Still going 💪</Text>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
    );
}



const streakStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',  // Changed to column
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 10,    
        padding: 20,         
        paddingBottom: 15,   // Increased padding for buttons
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
        width: '100%', // Take full width of parent
        marginTop: 20, 
        height: 10, 
        flexDirection: 'row',  
        backgroundColor: '#E0E0E0',
        borderRadius: 5,  

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Take full width of the parent
        marginTop: 13,
        paddingHorizontal: 0,  // Add some horizontal padding
    },
    button: {
        backgroundColor: '#112A46',  // A background for the buttons
        borderRadius: 5,             // Rounded corners for the buttons
        marginRight: 5,              // Spacing between the buttons
    },
    buttonText: {
        fontSize: 16, 
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: 'white',              // White text for contrast
    }
    
});

export default Streak;

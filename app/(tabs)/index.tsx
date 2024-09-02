import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Welcome to Naari Sahyog</Text>
                <Text style={styles.description}>
                    Your safety companion app, empowering women with peace of mind.
                </Text>
                <TouchableOpacity style={styles.sosButton} activeOpacity={0.7}>
                    <Text style={styles.sosButtonText}>Send SOS Alert</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Feature Cards Layout */}
            <View style={styles.featureContainer}>
                <View style={styles.featureRow}>
                    <FeatureCard 
                        title="24/7 Protection" 
                        description="Stay safe around the clock with our continuous monitoring and support." 
                    />
                    <FeatureCard 
                        title="Personalized Safety" 
                        description="Customize your safety settings to fit your unique needs and lifestyle." 
                    />
                </View>
                <FeatureCard 
                    title="Instant Assistance" 
                    description="Get immediate help with just one tap in case of emergencies." 
                />
            </View>
        </View>
    );
};

const Header = () => (
    <View style={styles.header}>
        <Ionicons name="shield" size={60} color="#6E4B8D" />
    </View>
);

const FeatureCard = ({ title, description }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F0FF', // Light background color
        padding: 20,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    content: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the start
        paddingBottom: 10,
    },
    title: {
        fontSize: 30, // Increased size
        fontWeight: 'bold',
        color: '#4B3C6F', // Dark purple
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: '#ccc', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Offset for shadow
        textShadowRadius: 3, // Blur radius of shadow
    },
    description: {
        fontSize: 14,
        color: '#6E4B8D', // Medium purple
        textAlign: 'center',
        marginBottom: 20,
    },
    sosButton: {
        backgroundColor: '#FF3B30', // Bright red to mimic a safety light
        paddingVertical: 12,
        borderRadius: 30,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        elevation: 5,
    },
    sosButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    featureContainer: {
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',  // Use full width
        alignItems: 'center', // Center the cards horizontally
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between cards
        width: '100%',
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        elevation: 5, // Shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width: '45%', // Adjusted width for two cards side by side
    },
    cardTitle: {
        fontSize: 18, // Increased size for titles 
        fontWeight: 'bold',
        color: '#6E4B8D',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 12,
        color: '#4B3C6F',
        textAlign: 'center', // Center text for better readability
    },
});

export default WelcomeScreen;

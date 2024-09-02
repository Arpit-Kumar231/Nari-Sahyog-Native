import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example for importing icons

export function LandingPage() {
    const [contactList, setContactList] = useState([{ Name: 'Police of India', PhoneNo: '100' }]); // Default police contact
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [fadeAnim]);

    const handleAddContact = () => {
        if (name && phoneNo) {
            if (isEditing) {
                // Update existing contact
                const updatedContacts = [...contactList];
                updatedContacts[editingIndex] = { Name: name, PhoneNo: phoneNo };
                setContactList(updatedContacts);
                setIsEditing(false);
                setEditingIndex(null);
            } else {
                // Add new contact
                setContactList([...contactList, { Name: name, PhoneNo: phoneNo }]);
            }
            setName('');
            setPhoneNo('');
        }
    };

    const handleEditContact = (index) => {
        setName(contactList[index].Name);
        setPhoneNo(contactList[index].PhoneNo);
        setIsEditing(true);
        setEditingIndex(index);
    };

    const handleRemoveContact = (index) => {
        if (index === 0) {
            // Prevent removing the Police of India contact
            alert("You cannot remove the Police of India contact.");
        } else {
            setContactList(contactList.filter((_, i) => i !== index));
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Header />
            <ScrollView contentContainerStyle={styles.content}>
                <MainSection />
                <SetupContacts
                    name={name}
                    setName={setName}
                    phoneNo={phoneNo}
                    setPhoneNo={setPhoneNo}
                    handleAddContact={handleAddContact}
                    isEditing={isEditing}
                />
                <ContactList contacts={contactList} handleEditContact={handleEditContact} handleRemoveContact={handleRemoveContact} />
            </ScrollView>
            <Footer />
        </Animated.View>
    );
}

const Header = () => (
    <View style={styles.header}>
        <TouchableOpacity style={styles.logo}>
            <ShieldIcon style={styles.icon} />
            <Text style={styles.logoText}>Women's Safety</Text>
        </TouchableOpacity>
        <View style={styles.nav}>
            <TouchableOpacity><Text style={styles.navLink}>Resources</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.navLink}>Contacts</Text></TouchableOpacity>
        </View>
    </View>
);

const MainSection = () => (
    <View style={styles.mainSection}>
        <Text style={styles.title}>Stay Safe, Stay Empowered</Text>
        <Text style={styles.description}>
            Quickly send an emergency message or call to your pre-saved contacts with the tap of a button.
        </Text>
        <TouchableOpacity style={styles.sosButton} activeOpacity={0.7}>
            <PhoneIcon style={styles.icon} />
            <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
    </View>
);

const SetupContacts = ({ name, setName, phoneNo, setPhoneNo, handleAddContact, isEditing }) => {
    const [showInputs, setShowInputs] = useState(false); // State to control visibility of input fields

    const handleVisibilityToggle = () => {
        setShowInputs(!showInputs);
        if (isEditing) {
            // Resetting the editing state if they decide to add a new contact
            setIsEditing(false);
            setName('');
            setPhoneNo('');
        }
    };

    return (
        <View style={styles.setupContacts}>
            <Text style={styles.subTitle}>Set Up Your Emergency Contacts</Text>
            <Text style={styles.introText}>
                Enter the names and phone numbers of trusted individuals who can help you in emergencies.
            </Text>
            <TouchableOpacity style={styles.addButton} onPress={handleVisibilityToggle}>
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Add Contact</Text>
            </TouchableOpacity>

            {showInputs && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Contact Name"
                        placeholderTextColor="#B0B0B0"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone Number"
                        placeholderTextColor="#B0B0B0"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={handleAddContact}>
                        <Text style={styles.buttonText}>{isEditing ? 'Submit' : 'Submit'}</Text>
                    </TouchableOpacity>
                </>
            )}
            <Text style={styles.securityText}>
                Your contacts will be kept secure and private.
            </Text>
        </View>
    );
};

const ContactList = ({ contacts, handleEditContact, handleRemoveContact }) => (
    <View style={styles.contactList}>
        <Text style={styles.contactListTitle}>Your Emergency Contacts</Text>
        {contacts.map((contact, index) => (
            <View key={index} style={[styles.contactCard, index === 0 ? styles.policeCard : null]}>
                <Text style={[styles.contactName, index === 0 ? styles.policeName : null]}>{contact.Name}</Text>
                <Text style={[styles.contactPhone, index === 0 ? styles.policePhone : null]}>{contact.PhoneNo}</Text>
                <Text style={styles.contactDescription}>Your trusted contact</Text>
                {index !== 0 && (  // Show actions only for non-police contacts
                    <View style={styles.cardActions}>
                        <TouchableOpacity onPress={() => handleEditContact(index)}>
                            <Ionicons name="create-outline" size={22} color="#6E4B8D" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRemoveContact(index)}>
                            <Ionicons name="trash-outline" size={22} color="#FF4C4C" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        ))}
        {contacts.length === 0 && <Text style={styles.noContactsText}>No contacts added yet.</Text>}
    </View>
);

const Footer = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>About</Text>
    </View>
);

const ShieldIcon = (props) => (
    <Ionicons name="shield" size={24} color="white" {...props} />
);

const PhoneIcon = (props) => (
    <Ionicons name="call" size={24} color="white" {...props} />
);

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B3C6F', // Dark purple background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#5F4B8C', // Lighter dark purple for header
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        color: '#FFFFFF', // White text for logo
        fontSize: 18,
        fontWeight: 'bold',
    },
    nav: {
        marginLeft: 'auto',
        flexDirection: 'row',
    },
    navLink: {
        color: '#FFFFFF',
        marginLeft: 16,
    },
    mainSection: {
        padding: 20,
        backgroundColor: '#8E77A2', // Soft purple background
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    description: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: 12,
        maxWidth: 600,
    },
    sosButton: {
        backgroundColor: '#FF4C4C',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    setupContacts: {
        padding: 20,
        backgroundColor: '#FFFFFF', // White background for better contrast
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4B3C6F',
        marginBottom: 10,
    },
    introText: {
        color: '#6E4B8D', // Medium purple color for the intro text
        marginBottom: 15,
        fontSize: 16,
        fontStyle: 'italic',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginVertical: 10,
        borderRadius: 25,
        padding: 15,
        color: '#000',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#FF6F61', // Bright color for visibility
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    confirmButton: {
        backgroundColor: '#6E4B8D',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    securityText: {
        fontSize: 12,
        color: '#B0B0B0',
        marginTop: 10,
    },
    contactList: {
        padding: 20,
        backgroundColor: '#FFFFFF', // White background for contact list
        borderRadius: 10,
        marginVertical: 10,
        elevation: 3,
    },
    contactListTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4B3C6F', // Dark purple for title
        marginBottom: 10,
    },
    contactCard: {
        backgroundColor: '#F0EBF4', // Light lavender background for contact cards
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 2, // Soft shadow for cards
    },
    policeCard: {
        backgroundColor: '#D1E7DD', // Light green background for the police contact
    },
    policeName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#155724', // Dark green for police name
    },
    policePhone: {
        color: '#0C5460', // Dark teal for police phone number
        fontWeight: 'bold',
    },
    contactName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#4B3C6F', // Dark purple for contact name
    },
    contactPhone: {
        color: '#6E4B8D', // Medium purple for phone number
        marginVertical: 3,
    },
    contactDescription: {
        fontStyle: 'italic',
        color: '#B0B0B0', // Italic for trusted contact description
    },
    noContactsText: {
        textAlign: 'center',
        color: '#B0B0B0', // Light grey for no contacts message
        marginTop: 10,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    footer: {
        padding: 20,
        backgroundColor: '#5F4B8C', // Lighter dark purple for footer
        alignItems: 'center',
    },
    footerText: {
        fontWeight: 'bold',
        color: '#FFFFFF', // White footer text
    },
});

export default LandingPage;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import { Provider as PaperProvider, Button, Card } from 'react-native-paper';

const UserDataPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userData, setUserData] = useState([]);

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      Alert.alert('Error', 'Please complete all fields');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setUserData((prevData) => [...prevData, { name, email, phone }]);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <PaperProvider>
      <View style={styles.outerContainer}>
        <View style={styles.stripeBorder}></View>
        <View style={styles.container}>
          <Text style={styles.title}>Safety Contacts</Text>
          <Text style={styles.subtitle}>Your Trusted Circle</Text>

          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#bd93f9"
            accessibilityLabel="Name"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#bd93f9"
            accessibilityLabel="Email"
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#bd93f9"
            accessibilityLabel="Phone Number"
          />

          <Button
            mode="contained"
            icon="plus"
            onPress={handleSubmit}
            style={styles.addButton}
            labelStyle={styles.addButtonText}
          >
            Add
          </Button>

          <FlatList
            data={userData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Card style={styles.userItem} elevation={3}>
                <Card.Content>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactInfo}>Email: {item.email}</Text>
                  <Text style={styles.contactInfo}>Phone: {item.phone}</Text>
                </Card.Content>
              </Card>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    padding: 10, // Background color to create the illusion of stripes
  },
  stripeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 50,
    padding : 40,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopColor: '#FFF5E0', // Dark purple for stripes
    borderBottomColor: '',
  },
  container: {
    flex: 1,
    margin: 12,
    backgroundColor: '#FFF5E0',
    padding: 20,
    borderRadius: 15, // Rounded edges for the inner content
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#C7003966',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#C7003966',
  },
  input: {
    borderColor: '#d1c4e9',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 15,
    padding: 15,
    fontSize: 16,
    color: '#C7003966',
    backgroundColor: '#fff',
  },
  addButton: {
    marginVertical: 20,
    backgroundColor: '#C7003966',
    borderRadius: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  userItem: {
    marginVertical: 10,
    backgroundColor: '#C7003966',
    borderRadius: 15,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#483d8b',
  },
  contactInfo: {
    fontSize: 14,
    color: '#6a5acd',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default UserDataPage;

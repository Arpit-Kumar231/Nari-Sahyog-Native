import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Request location permissions and get the current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Function to handle tracking the user's location
  const handleTrackMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Location permission is required to use this feature.");
      return; // Exit if permission is not granted
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    
    setDestination(null); // Clear destination when tracking the user
  };

  // Function to handle clicks on the map
  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDestination({ latitude, longitude }); // Set the destination to the clicked location
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Default initial location
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          currentPosition && {
            latitude: destination ? destination.latitude : currentPosition.latitude,
            longitude: destination ? destination.longitude : currentPosition.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }
        }
        onPress={handleMapPress} // Handle map press event
      >
        {currentPosition && (
          <Marker coordinate={currentPosition} title="You are here" />
        )}

        {destination && (
          <Marker coordinate={destination} title="Destination" pinColor="red" />
        )}
      </MapView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTrackMe}>
          <Text style={styles.buttonText}>Track Me</Text>
        </TouchableOpacity>
      </View>

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: '5%',
    right: '5%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: { color: 'black', fontWeight: 'bold' },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
});

export default App;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const EmergencyCare = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, long: longitude });
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Google Maps Embed API URL
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=key&q=${userLocation.lat},${userLocation.long}`;

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        // For Web: Use an iframe to embed the Google Map
        <iframe
          width="100%"
          height="400"
          src={googleMapsEmbedUrl}
          style={styles.map}
          allowFullScreen
          loading="lazy"
        ></iframe>
      ) : (
        // For mobile, just display the coordinates
        <View style={styles.locationContainer}>
          <Text style={styles.text}>Latitude: {userLocation.lat}</Text>
          <Text style={styles.text}>Longitude: {userLocation.long}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  map: {
    border: 'none',
  },
  locationContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default EmergencyCare;

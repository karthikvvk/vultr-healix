import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';  // Ensure axios is imported

const Map = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [hospitals, setHospitals] = useState([]);  // Initialize hospitals as an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any errors from the API

  // Fetch location and hospitals data on component mount
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } else {
        console.log('Location permission denied');
      }
    };

    getLocation();

    // Make the API call after the component mounts
    const fetchNearbyHospitals = async () => {
      try {
        const response = await axios.get('http://10.42.0.152:5000/api/nearby-places');
        console.log('Fetched hospitals:', response.data); // Log the response to verify structure

        if (response.data && response.data.length > 0) {
          setHospitals(response.data);  // Set the fetched hospital data to state
        } else {
          setHospitals([]);  // No hospitals found
        }
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setError('Error fetching hospitals data');
        setLoading(false);  // Stop loading on error
      }
    };

    fetchNearbyHospitals();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Function to focus on a specific hospital by updating the region
  const focusOnHospital = (coordinates) => {
    setRegion({
      ...coordinates,
      latitudeDelta: 0.01,  // Zoom in closer to the hospital
      longitudeDelta: 0.01,
    });
  };

  // Handle the loading and error state
  if (loading && !region) {
    return <Text style={styles.loadingText}>Loading...</Text>;  // Show loading message while waiting for location and data
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={28} color="#0A84FF" />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-sharp" size={28} color="#FF9500" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Community')}>
            <Ionicons name="megaphone" size={28} color="#34C759" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mapContainer}>
        {region && (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            loadingEnabled={true}
          >
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                }}
                title={hospital.name}
                onPress={() => focusOnHospital({
                  latitude: hospital.geometry.location.lat,
                  longitude: hospital.geometry.location.lng,
                })}
              >
                <Callout onPress={() => Linking.openURL(`tel:${hospital.international_phone_number}`)}>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{hospital.name}</Text>
                    <Text style={styles.calloutText}>Distance: {hospital.vicinity}</Text>
                    <Text style={styles.calloutText}>Rating: {hospital.rating || 'N/A'}</Text>
                    <Text style={styles.calloutText}>Tap to call: {hospital.international_phone_number}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Display error message */}
      {!loading && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Display no hospitals found message */}
      {!loading && hospitals.length === 0 && !error && (
        <Text style={styles.noHospitalsText}>No nearby hospitals found</Text>
      )}

      {/* Display list of hospitals */}
      <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
        {hospitals.map((hospital, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.infoBox, index % 2 === 0 ? styles.infoBoxAlt : null]}
            onPress={() => focusOnHospital({
              latitude: hospital.geometry.location.lat,
              longitude: hospital.geometry.location.lng,
            })}
          >
            <Text style={styles.title}>{hospital.name}</Text>
            <Text style={styles.text}><FontAwesome name="map-marker" size={16} color="#007AFF" /> Distance: {hospital.vicinity}</Text>
            <Text style={styles.text}><FontAwesome name="star" size={16} color="#FFD700" /> Rating: {hospital.rating || 'N/A'}</Text>
            <Text style={styles.text}><FontAwesome name="phone" size={16} color="#FF3B30" /> {hospital.international_phone_number}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity>
          <FontAwesome name="stethoscope" size={24} color="#FF3B30" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="clipboard-text" size={24} color="#FFCC00" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="pills" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="watch" size={24} color="#34C759" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  homeButton: {
    padding: 10,
  },
  iconGroup: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    color: '#007AFF',
    fontSize: 14,
  },
  calloutText: {
    fontSize: 12,
    color: '#4A4A4A',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  infoBoxAlt: {
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#4A4A4A',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  noHospitalsText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Map;

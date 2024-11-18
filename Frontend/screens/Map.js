import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Linking, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const EmergencyCare = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, long: 0 });

  const callEmergencyServices = () => {
    Linking.openURL('tel:911'); // Update with the appropriate emergency number for your region
  };

  const sendLocationToEmergency = () => {
    Alert.alert('Sending Location', 'Your current location has been sent to emergency responders.');
  };

  const showFirstAidTips = () => {
    navigation.navigate('FirstAidTips');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Emergency Care</Text>

      {/* Emergency Actions Section */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={callEmergencyServices}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.buttonText}>Call Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={sendLocationToEmergency}>
          <Ionicons name="location-sharp" size={24} color="white" />
          <Text style={styles.buttonText}>Send Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showFirstAidTips}>
          <Ionicons name="medkit" size={24} color="white" />
          <Text style={styles.buttonText}>First Aid Tips</Text>
        </TouchableOpacity>
      </View>

    

      {/* Nearby Hospitals */}
      <Text style={styles.subtitle}>Nearby Hospitals</Text>
      <View style={styles.hospitals}>
        <TouchableOpacity style={styles.hospitalCard}>
          <Text style={styles.hospitalText}>Hospital ABC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hospitalCard}>
          <Text style={styles.hospitalText}>Hospital XYZ</Text>
        </TouchableOpacity>
      </View>

      {/* Map Section */}
      <Text style={styles.subtitle}>Hospital Locations</Text>
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <View style={styles.route} />
          <View style={styles.startPoint} />
          <View style={styles.endPoint} />
        </View>
      </View>

      {/* Notification Section */}
      <View style={styles.notification}>
        <Image style={styles.profilePic} source={{ uri: 'https://placehold.co/40x40' }} />
        <View>
          <Text style={styles.notificationText}>Steve is on the way.</Text>
          <Text style={styles.notificationText}>Estimated arrival in 5 min</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="times" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Hospital Information */}
      <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
      <View style={styles.hospitalContainer}>
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>General Hospital</Text>
          <Text style={styles.hospitalDetails}>Distance: 1.2 km</Text>
          <Text style={styles.hospitalDetails}>Beds Available: 15</Text>
        </View>
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>City Health Clinic</Text>
          <Text style={styles.hospitalDetails}>Distance: 2.5 km</Text>
          <Text style={styles.hospitalDetails}>Beds Available: 8</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9534F',
    textAlign: 'center',
    marginBottom: 20,
  },
  actionsContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#D9534F',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  checklist: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  hospitals: {
    marginTop: 20,
  },
  hospitalCard: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  hospitalText: {
    fontSize: 16,
    color: '#333',
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  route: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#00bcd4',
  },
  startPoint: {
    width: 20,
    height: 20,
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    left: 50,
  },
  endPoint: {
    width: 20,
    height: 20,
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    position: 'absolute',
    top: 150,
    left: 150,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginBottom: 10,
  },
  hospitalContainer: {
    marginBottom: 20,
  },
  hospitalCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hospitalDetails: {
    fontSize: 14,
    color: '#777',
  },
});

export default EmergencyCare;

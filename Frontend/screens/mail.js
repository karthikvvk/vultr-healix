import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MapPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>


      {/* Map and Route */}
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <View style={styles.route} />
          <View style={styles.startPoint} />
          <View style={styles.endPoint} />
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.info}>
        <View style={styles.address}>
          <FontAwesome name="map-marker" size={20} color="#00bcd4" />
          <Text style={styles.addressText}>7655 Ridgeview Court{"\n"}North Andover, MA 01845</Text>
        </View>
        <View style={styles.address}>
          <FontAwesome name="map-marker" size={20} color="#00bcd4" />
          <Text style={styles.addressText}>848 South Country Club Dr.{"\n"}Marshalltown, IA 50158</Text>
        </View>
      </View>

      {/* Notification Section */}
      <View style={styles.notification}>
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://placehold.co/40x40' }}
        />
        <View>
          <Text style={styles.notificationText}>Steve is on the way.</Text>
          <Text style={styles.notificationText}>Estimated arrival in 5 min</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="times" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Hospital Availability Section */}
      <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
      <View style={styles.hospitalContainer}>
        {/* Hospital Card 1 */}
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>General Hospital</Text>
          <Text style={styles.hospitalDetails}>Distance: 1.2 km</Text>
          <Text style={styles.hospitalDetails}>Beds Available: 15</Text>
        </View>
        {/* Hospital Card 2 */}
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>City Health Clinic</Text>
          <Text style={styles.hospitalDetails}>Distance: 2.5 km</Text>
          <Text style={styles.hospitalDetails}>Beds Available: 8</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
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
  info: {
    marginVertical: 20,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressText: {
    marginLeft: 10,
    color: '#333',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
   
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
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
    color: '#555',
    marginTop: 5,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from "../logout";  // Import the LogoutButton component

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token'); // Check if a token exists in AsyncStorage
      if (token) {
        setIsLoggedIn(true); // Set the logged-in state to true if a token is found
      } else {
        setIsLoggedIn(false);
        navigation.navigate('SignIn') // Set the logged-out state if no token is found
      }
    };
    checkLoginStatus();
  }, []); // Run only once when the component mounts



  // If logged in, show the home screen
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" backgroundColor="#F5F8FB" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.locationText}>HealiX</Text>

          {/* Add LogoutButton here */}
          <LogoutButton navigation={navigation} />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.mainText}>How are you today?</Text>
        <Text style={styles.mainText}>username</Text>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="gray" />
          <TextInput placeholder="Search Doctor or Symptoms" style={styles.searchInput} />
        </View>

        {/* Symptoms Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symptomContainer}>
          <View style={styles.symptomButton}>
            <Text>🥶 Feel Cold</Text>
          </View>
          <View style={styles.symptomButton}>
            <Text>🌡️ High Temperature</Text>
          </View>
        </ScrollView>

        {/* Event Card */}
        <View style={styles.eventCard}>
          <Text style={styles.eventText}>Take Care of Mental Health During Pandemic</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for event image
            style={styles.eventImage}
          />
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join Event</Text>
          </TouchableOpacity>
        </View>

        {/* Next Consultation */}
        <View style={styles.consultationSection}>
          <Text style={styles.sectionTitle}>Next Consultation</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.consultationCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder for doctor image
              style={styles.consultationIcon}
            />
            <View style={styles.consultationDetails}>
              <Text style={styles.doctorName}>Dr. Brooklyn Simmons</Text>
              <Text style={styles.specialty}>Gastroenterologist</Text>
              <Text style={styles.consultationTime}>20 Nov 2020 | 12:30 - 13:00</Text>
            </View>
          </View>
          <View style={styles.consultationCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder for doctor image
              style={styles.consultationIcon}
            />
            <View style={styles.consultationDetails}>
              <Text style={styles.doctorName}>Dr. Sarah Williams</Text>
              <Text style={styles.specialty}>Cardiologist</Text>
              <Text style={styles.consultationTime}>21 Nov 2020 | 14:00 - 15:00</Text>
            </View>
          </View>
          <View style={styles.consultationCard}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder for doctor image
              style={styles.consultationIcon}
            />
            <View style={styles.consultationDetails}>
              <Text style={styles.doctorName}>Dr. Alex Morgan</Text>
              <Text style={styles.specialty}>Pediatrician</Text>
              <Text style={styles.consultationTime}>22 Nov 2020 | 10:00 - 11:00</Text>
            </View>
          </View>
        </ScrollView>

        {/* What do you need section */}
        <View style={styles.consultationSection}>
          <Text style={styles.sectionTitle}>What do you need?</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="medkit" size={40} color="#5A99D4" />
            <Text style={styles.featureText}>Medications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="pulse" size={40} color="#5A99D4" />
            <Text style={styles.featureText}>Health Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="heart" size={40} color="#5A99D4" />
            <Text style={styles.featureText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="chatbubbles" size={40} color="#5A99D4" />
            <Text style={styles.featureText}>Consult Chat</Text>
          </TouchableOpacity>
        </ScrollView>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="home-outline" size={28} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="calendar-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.addButton, styles.iconWrapper]}>
          <Feather name="plus" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="person-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FB',
    paddingHorizontal: 20,
    paddingTop: 10, // Added top padding to prevent content from overlapping status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  locationText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  symptomContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  symptomButton: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginRight: 10,
  },
  eventCard: {
    backgroundColor: '#D0EBFF',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  joinButton: {
    marginTop: 10,
    backgroundColor: '#5A99D4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  joinText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  consultationSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    color: '#5A99D4',
  },
  consultationCard: {
    backgroundColor: '#FFF',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginRight: 15,
  },
  consultationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  consultationDetails: {
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#999',
  },
  consultationTime: {
    fontSize: 14,
    color: '#333',
  },
  featureButton: {
    backgroundColor: '#FFF',
    padding: 8,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  featureText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 15,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#5A99D4',
    padding: 12,
    borderRadius: 30,
  },
});

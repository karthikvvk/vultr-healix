import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomBottomNav from "./CustomBottomNav";

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selected, setSelected] = useState('Home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coins, setCoins] = useState(100);

  const handleNavigation = (screen) => {
    setSelected(screen);
    navigation.navigate(screen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsLoggedIn(false);
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoggedIn) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
    {/* Other components like header, greeting, search bar, etc. */}

    {/* Bottom Navigation */}
    
        <ScrollView style={styles.container}>
          {/* Status Bar */}
          <CustomBottomNav 
            selected={selected} 
            onSelect={handleNavigation} 
          />
          <StatusBar barStyle="dark-content" backgroundColor="#F5F8FB" />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.locationText}>HealiX</Text>
            <TouchableOpacity onPress={() => handleNavigation('Coin')}>
              <View style={styles.coinContainer}>
                <FontAwesome name="bitcoin" size={24} color="#FFD700" />
                <Text style={styles.coinText}>{coins}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDrawer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          {/* Drawer Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isDrawerOpen}
            onRequestClose={toggleDrawer}
          >
            <View style={styles.drawerOverlay}>
              <View style={styles.drawerContent}>
                <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
                  <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.drawerTitle}>Profile</Text>
                <TouchableOpacity style={styles.drawerItem} onPress={() => handleNavigation('Profile')}>
                  <Text style={styles.drawerItemText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
                  <Text style={styles.drawerItemText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerItem} onPress={() => handleNavigation('Settings')}>
                  <Text style={styles.drawerItemText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Greeting */}
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.mainText}>How are you today?</Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="gray" />
            <TextInput placeholder="Search Doctor or Symptoms" style={styles.searchInput} />
          </View>

          {/* Symptoms Buttons */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symptomContainer}>
            <View style={styles.symptomButton}><Text>🥶 Feel Cold</Text></View>
            <View style={styles.symptomButton}><Text>🌡️ High Temperature</Text></View>
            <View style={styles.symptomButton}><Text>💉 Vaccination</Text></View>
            <View style={styles.symptomButton}><Text>📰 News</Text></View>
            <View style={styles.symptomButton}><Text>🩺 Check Symptoms</Text></View>
          </ScrollView>

          {/* Event Card */}
          <View style={styles.eventCard}>
            <Text style={styles.eventText}>Prioritize Your Mental Well-being with 24/7 Emergency Support</Text>
            <TouchableOpacity onPress={() => handleNavigation('Maps')} style={styles.joinButton}>
              <Text style={styles.joinText}>Emergency</Text>
            </TouchableOpacity>
          </View>

          {/* Next Consultation */}
          <View style={styles.consultationSection}>
            <Text style={styles.sectionTitle}>Next Consultation</Text>
            <TouchableOpacity onPress={() => handleNavigation('Viewlist')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.consultationCard}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
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
                source={{ uri: 'https://via.placeholder.com/50' }}
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
                source={{ uri: 'https://via.placeholder.com/50' }}
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
              <Ionicons name="medkit" size={40} color="#FF0004FF" />
              <Text style={styles.featureText}>Medications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Ionicons name="pulse" size={40} color="#F944E7FF" />
              <Text style={styles.featureText}>Health Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Ionicons name="heart" size={40} color="#41F3D5FF" />
              <Text style={styles.featureText}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Ionicons name="chatbubbles" size={40} color="#34FFAAFF" />
              <Text style={styles.featureText}>Consult Chat</Text>
            </TouchableOpacity>
          </ScrollView>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FB',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
    backgroundColor: '#F85151FF',
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
  joinButton: {
    marginTop: 10,
    backgroundColor: '#000000FF',
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
    color: '#29ACAFFF',
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
  drawerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContent: {
    backgroundColor: '#FFF',
    width: 250,
    height: '100%',
    padding: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    position: 'absolute',
    right: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    marginBottom: 15,
  },
  drawerItemText: {
    fontSize: 18,
    color: '#333',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 170,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 5,
  },
});

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={28} color="#00796b" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Ionicons name="notifications-sharp" size={28} color="#09C7E9CB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Community')}>
            <Ionicons name="megaphone" size={28} color="#0B4344AE" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.body}>
        {/* User Section */}
        <View style={styles.userSection}>
  <View style={styles.cardRow}>
    <TouchableOpacity style={[styles.card, styles.tealBackground]}>
      <Text style={styles.cardText}>Find Doctor</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.card, styles.tealBackground]}>
      <Text style={styles.cardText}>My Appointments</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.card, styles.emergencyCard]}
      onPress={() => navigation.navigate('Map')}
    >
      <Text style={styles.emergencyText}>Emergency Care</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.userInfo}>
    <View style={styles.userIcons}>
      <Ionicons name="qr-code" size={24} color="#d32f2f" />
      <Ionicons name="location" size={24} color="#00796b" style={{ marginLeft: 8 }} />
    </View>
    <Ionicons name="arrow-forward" size={24} color="#00796b" />
  </View>
  <Text style={styles.userName}>User  Name</Text>
</View>
        {/* Scrollable List of Services */}
        <ScrollView style={styles.serviceList}>
          {[
            { name: 'Medical History', description: 'View your medical history', icon: <Ionicons name="book" size={24} color="#00796b" />, screen: 'MedicalHistory' },
            { name: 'Test Results', description: 'Check your test results', icon: <Ionicons name="file-tray-full" size={24} color="#00796b" />, screen: 'TestResults' },
            { name: 'Prescriptions', description: 'Manage your prescriptions', icon: <Ionicons name="document-text" size={24} color="#00796b" />, screen: 'Prescriptions' },
            { name: 'Vaccination', description: 'Track your vaccinations', icon: <Ionicons name="shield-checkmark" size={24} color="#00796b" />, screen: 'Vaccination' },
            { name: 'Find Pharmacy', description: 'Locate nearby pharmacies', icon: <Ionicons name="medkit" size={24} color="#00796b" />, screen: 'FindPharmacy' },
            { name: 'Medical Insurance', description: 'Manage your insurance', icon: <Ionicons name="card" size={24} color="#00796b" />, screen: 'MedicalInsurance' },
            { name: 'Chat with Doctor', description: 'Talk to your doctor', icon: <Ionicons name="chatbubbles" size={24} color="#00796b" />, screen: 'ChatWithDoctor' },
            { name: 'Lab Tests', description: 'View lab test results', icon: <Ionicons name="flask" size={24} color="#00796b" />, screen: 'LabTests' },
            { name: 'Health Tips', description: 'Get health tips', icon: <Ionicons name="information-circle" size={24} color="#00796b" />, screen: 'HealthTips' },
          ].map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.serviceItem}>
                {item.icon}
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.serviceDescription}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <FontAwesome name="stethoscope" size={24} color="#00796b" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="clipboard-text" size={24} color="#00796b" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="pills" size={24} color="#00796b" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="watch" size={24} color="#00796b" />
        </TouchableOpacity>
      </View>

      {/* Custom Sidebar (Drawer) */}
      <Modal
        transparent={true}
        visible={isDrawerOpen}
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <TouchableOpacity style={styles.overlay} onPress={closeDrawer}>
          <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.drawerItem}>Home</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.drawerItem}>Profile</Text>
            </TouchableOpacity>
            <Text style={styles.drawerItem}>Appointments</Text>
            <Text style={styles.drawerItem}>Settings</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerIcons: {
    flexDirection: 'row',
    width: 70,
  },
  body: {
    flex: 1,
    padding: 16,
  },
  userSection: {
    backgroundColor: '#e0f7fa', // Light teal background for the user section
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    height: 80,
    width: '30%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  tealBackground: {
    backgroundColor: '#0C6B5DFF', // Crimson shade for emergency
   
    borderWidth: 0,
  },
  emergencyCard: {
    backgroundColor: '#d32f2f',
    borderColor: '#ff4d4d',
    borderWidth: 2,
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  serviceList: {
    flex: 1,
    padding: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  serviceInfo: {
    marginLeft: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  userIcons: {
    flexDirection: 'row',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
 flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 8,
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: '#00796b',
  },
});
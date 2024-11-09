import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const App = ({ navigation }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const notifications = [
    { id: 1, title: 'Appointment Reminder', description: 'You have an appointment tomorrow at 10:00 AM with Dr. Johnson at the clinic.', icon: <FontAwesome name="calendar" size={24} color="#FF6F61" /> },
    { id: 2, title: 'New Message', description: 'You have a new message from Dr. Smith regarding your recent test results.', icon: <MaterialCommunityIcons name="message" size={24} color="#6A5ACD" /> },
    { id: 3, title: 'Prescription Ready', description: 'Your prescription for blood pressure medication is ready for pickup at the pharmacy.', icon: <FontAwesome5 name="pills" size={24} color="#20B2AA" /> },
    { id: 4, title: 'Health Tip', description: 'Stay hydrated! Drink at least 8 glasses of water a day to maintain good health.', icon: <Ionicons name="water" size={24} color="#FF8C00" /> },
    { id: 5, title: 'Vaccination Reminder', description: 'Don’t forget your vaccination appointment next week on Wednesday at 3 PM.', icon: <MaterialCommunityIcons name="shield-check" size={24} color="#FF6347" /> },
    { id: 6, title: 'Follow-Up Required', description: 'Please schedule a follow-up visit within the next month to monitor your progress.', icon: <FontAwesome name="stethoscope" size={24} color="#4682B4" /> },
    { id: 7, title: 'Test Results Available', description: 'Your lab test results are now available. Please log in to view them.', icon: <MaterialCommunityIcons name="clipboard-text" size={24} color="#8A2BE2" /> },
    { id: 8, title: 'Medication Reminder', description: 'It’s time to take your medication! Don’t forget to take your morning dose.', icon: <FontAwesome5 name="pills" size={24} color="#20B2AA" /> },
    { id: 9, title: 'Appointment Confirmation', description: 'Your appointment has been confirmed for next Friday at 2 PM.', icon: <FontAwesome name="calendar-check-o" size={24} color="#32CD32" /> },
    { id: 10, title: 'Dietary Advice', description: 'Consider incorporating more fruits and vegetables into your diet for better health.', icon: <MaterialCommunityIcons name="food-apple" size={24} color="#FF4500" /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* Notification List */}
      <ScrollView style={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationItem}
            onPress={() => setSelectedNotification(notification.id === selectedNotification ? null : notification.id)}
          >
            <View style={styles.notificationIcon}>
              {notification.icon}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{selectedNotification === notification.id ? notification.description : ''}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Navigation */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00796b', // Teal background
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  notificationList: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    backgroundColor: '#ffffff', // White background for notification cards
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignContent: 'center',
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: '#1E3A8A', // Dark blue for title
  },
  notificationDescription: {
    color: '#666666', // Gray for description
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default App;
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Icon library

const Viewlist = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>

        <Text style={styles.headerText}>Appointments</Text>

      </View>

      {/* Appointment Cards */}
      <View style={styles.content}>
        {doctorData.map((doc, index) => (
          <AppointmentCard key={index} {...doc} />
        ))}
      </View>

      {/* New Appointment Button */}
      <Button mode="contained" style={styles.newAppointmentButton}>
        Book New Appointment
      </Button>
    </ScrollView>
  );
};

// Appointment Card Data
const doctorData = [
  {
    date: "Sat, 4 April 2020 | 3:15 PM",
    status: "Online",
    doctorName: "Dr. Daniel Morris",
    specialty: "Ophthalmology",
    location: "Churchtown Medical",
    contact: "123-456-7890",
    consultationTime: "15 mins",
    patientName: "Mr. Joe Bloggs",
    patientAge: "31 Y",
    action: "Pending",
    actionColor: "#E0E0E0",
    actionTextColor: "#757575",
    actionButton: "Delete",
    actionButtonColor: "#EF5350"
  },
  {
    date: "Mon, 7 April 2020 | 1:00 PM",
    status: "Onsite",
    doctorName: "Dr. Laura White",
    specialty: "Cardiology",
    location: "St. Mary's Hospital",
    contact: "987-654-3210",
    consultationTime: "45 mins",
    patientName: "Ms. Anna Lee",
    patientAge: "27 Y",
    action: "Confirmed",
    actionColor: "#C8E6C9",
    actionTextColor: "#388E3C",
    actionButton: "Details",
    actionButtonColor: "#1976D2"
  },
  {
    date: "Wed, 9 April 2020 | 4:30 PM",
    status: "Online",
    doctorName: "Dr. Samuel Lee",
    specialty: "Dermatology",
    location: "Skin Health Clinic",
    contact: "456-789-1234",
    consultationTime: "30 mins",
    patientName: "Mr. Mark Stone",
    patientAge: "45 Y",
    action: "Rejected",
    actionColor: "#FFCDD2",
    actionTextColor: "#D32F2F",
    actionButton: "Reschedule",
    actionButtonColor: "#FFB300"
  }
];

const AppointmentCard = ({ date, status, doctorName, specialty, location, contact, consultationTime, patientName, patientAge, action, actionColor, actionTextColor, actionButton, actionButtonColor }) => {
  return (
    <Card style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={[styles.statusText, status === 'Online' ? styles.onlineStatus : styles.onsiteStatus]}>{status}</Text>
      </View>
      <Divider />
      <View style={styles.cardContent}>
        <Avatar.Image size={50} source={{ uri: 'https://placehold.co/50x50' }} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.specialtyText}>{specialty}</Text>
          <Text style={styles.locationText}>{location}</Text>
          <Text style={styles.contactText}>Contact: {contact}</Text>
          <Text style={styles.consultationTimeText}>Consultation Time: {consultationTime}</Text>
        </View>
        <TouchableOpacity style={styles.mapIcon}>
          <Icon name="map-marker" size={20} color="#1976D2" />
          <Text style={styles.mapText}>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.patientInfo}>
        <Icon name="account" size={16} color="#757575" />
        <Text style={styles.patientText}>{patientName} | Age: {patientAge}</Text>
      </View>
      <View style={styles.actionSection}>
        <View style={[styles.actionTag, { backgroundColor: actionColor }]}>
          <Text style={[styles.actionText, { color: actionTextColor }]}>{action}</Text>
        </View>
        {actionButton && (
          <Button mode="contained" color={actionButtonColor} style={styles.actionButton}>
            {actionButton}
          </Button>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: 'white', padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerText: {
    color: '#1976D2',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    position: 'absolute', // To position the text in the center while allowing space for the icon
    left: '50%',
    transform: [{ translateX: "-50%" }] // Centers the text horizontally
  },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { marginLeft: 15 },
  content: { padding: 15 },
  newAppointmentButton: {
    backgroundColor: '#1976D2',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 8, // Control height for a more compact button
    paddingHorizontal: 20, // Control horizontal padding for a more compact button
  },
  appointmentCard: { marginBottom: 20, padding: 10, borderRadius: 10, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  dateText: { color: '#757575', fontSize: 14 },
  statusText: { fontSize: 14, fontWeight: 'bold' },
  onlineStatus: { color: '#388E3C' },
  onsiteStatus: { color: '#1976D2' },
  cardContent: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  doctorInfo: { marginLeft: 15, flex: 1 },
  doctorName: { fontSize: 16, fontWeight: 'bold', color: '#1976D2' },
  specialtyText: { color: '#757575' },
  locationText: { color: '#9E9E9E' },
  contactText: { color: '#757575', fontSize: 12 },
  consultationTimeText: { color: '#9E9E9E', fontSize: 12 },
  mapIcon: { alignItems: 'center', paddingLeft: 5 },
  mapText: { color: '#1976D2' },
  patientInfo: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  patientText: { color: '#757575', marginLeft: 5 },
  actionSection: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  actionTag: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, marginRight: 10 },
  actionText: { fontWeight: 'bold' },
  actionButton: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12, marginLeft: 10 }
});

export default Viewlist;

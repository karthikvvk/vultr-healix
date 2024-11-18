import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';  // Import the React Calendar component
import moment from 'moment';
import CustomBottomNav from "./CustomBottomNav";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const profiles = [
    { id: '1', name: 'John Doe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', name: 'Jane Smith', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '3', name: 'Alex Johnson', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '4', name: 'Emily Davis', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '5', name: 'Chris Lee', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  ];

  const timeSlots = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'];

  const namesRequired = ['Virtual', 'Hybrid', 'Onsite'];

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    setShowCalendar(false); // Hide the calendar after selecting the date
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search profiles..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Profile Selection */}
      <View style={styles.profileSection}>
        <Text style={styles.detailsTitle}>Select Profile</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredProfiles}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.profileCard, selectedProfile?.id === item.id && styles.selectedProfile]}
              onPress={() => handleProfileSelect(item)}
            >
              <Image source={{ uri: item.image }} style={styles.profileImage} />
              <Text style={styles.profileName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          horizontal
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Date Picker */}
      <View style={styles.detailsSection}>
        <Text style={styles.detailsTitle}>Select Date</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowCalendar(!showCalendar)}>
          <Ionicons name="calendar" size={24} color="#00BFFF" />
          <Text style={styles.dateText}>{selectedDate || 'Select Date'}</Text>
        </TouchableOpacity>

        {showCalendar && (
          <Calendar
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#00BFFF', selectedTextColor: '#fff' },
            }}
            onDayPress={(date) => handleCalendarChange(date.dateString)}
            monthFormat={'yyyy MM'}
            hideExtraDays={true}
          />
        )}
      </View>

      {/* Time Slot Selection */}
      <View style={styles.detailsSection}>
        <Text style={styles.detailsTitle}>Select Time Slot</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={timeSlots}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.timeSlot, selectedTimeSlot === item && styles.selectedTimeSlot]}
              onPress={() => handleTimeSelect(item)}
            >
              <Text style={styles.timeText}>{item}</Text>
            </TouchableOpacity>
          )}
          horizontal
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Names Required for Appointment */}
      <View style={styles.detailsSection}>
        <Text style={styles.detailsTitle}>Select Appointment Name</Text>
        <View style={styles.radioButtons}>
          {namesRequired.map((name, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.radioButton, selectedOption === name && styles.selectedRadioButton]}
              onPress={() => setSelectedOption(name)}
            >
              <Text style={styles.radioText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleModalOpen}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      {/* Modal for Appointment Details */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Ionicons name="close-circle" size={30} color="#FF6347" />
            </TouchableOpacity>
            <Text style={styles.appointmentDetailsTitle}>Appointment Details</Text>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentText}>Profile: {selectedProfile?.name}</Text>
              <Text style={styles.appointmentText}>Date: {selectedDate}</Text>
              <Text style={styles.appointmentText}>Time Slot: {selectedTimeSlot}</Text>
              <Text style={styles.appointmentText}>Appointment Name: {selectedOption}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  profileSection: {
    marginTop: 20,
  },
  profileCard: {
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  selectedProfile: {
    borderColor: '#00BFFF',
    borderWidth: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    fontSize: 14,
    marginTop: 5,
    color: '#00BFFF',
  },
  detailsSection: {
    marginTop: 20,
  },
  detailsTitle: {
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderColor: '#E0E4E8',
    borderWidth: 1,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  timeSlot: {
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedTimeSlot: {
    backgroundColor: '#00BFFF',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  radioButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedRadioButton: {
    backgroundColor: '#00BFFF',
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
  bookButton: {
    marginTop: 30,
    backgroundColor: '#00BFFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  appointmentDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  appointmentDetails: {
    marginBottom: 20,
  },
  appointmentText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default App;

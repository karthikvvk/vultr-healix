import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CustomBottomNav = () => {
  const [selectedTab, setSelectedTab] = useState('Home'); // State to track selected tab
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    setSelectedTab(screen); // Set the selected tab
    navigation.navigate(screen); // Navigate to the corresponding screen
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => handleNavigation('Home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home-outline"
          size={30}
          color={selectedTab === 'Home' ? '#55D8ED' : 'gray'} // Highlight selected icon
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => handleNavigation('Calendars')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="calendar-outline"
          size={30}
          color={selectedTab === 'Calendars' ? '#55D8ED' : 'gray'} // Highlight selected icon
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.addButton, styles.iconWrapper]}
        onPress={() => handleNavigation('Add')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add-circle-outline" // Add an icon for the 'Add' button
          size={30}
          color="white" // You can adjust the color as needed
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => handleNavigation('Mail')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="mail-outline"
          size={30}
          color={selectedTab === 'Mail' ? '#55D8ED' : 'gray'} // Highlight selected icon
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => handleNavigation('Profile')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="person-outline" // Add an icon for the 'Profile' tab
          size={30}
          color={selectedTab === 'Profile' ? '#55D8ED' : 'gray'} // Highlight selected icon
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#2BF1FFFF',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    paddingHorizontal: 5,
  },
});

export default CustomBottomNav;
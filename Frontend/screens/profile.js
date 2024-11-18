import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import CustomBottomNav from "./CustomBottomNav";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Save Changes" onPress={() => {/* Save logic here */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F8FB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Profile;
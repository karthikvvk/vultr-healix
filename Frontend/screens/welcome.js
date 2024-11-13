import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import doc from '../assets/doc.svg'; // If you are using SVG

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <Text style={styles.logoText}>Healix</Text>

      {/* Main Text */}
      <Text style={styles.title}>Striving to improve community health care and practices</Text>

      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        {/* Ensure you're using an Image tag correctly */}
        <Image source={doc} style={styles.image} /> {/* Replace this if you're using an SVG */}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6FDBE9FF', // Light pink background color
    padding: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: {
    color: '#999',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

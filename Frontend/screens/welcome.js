import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity of 0
  const scaleAnim = new Animated.Value(1); // Initial scale of the button

  // Start the fade-in animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to opacity 1
      duration: 2000, // Animation duration
      easing: Easing.ease,
      useNativeDriver: true, // Use native driver for better performance
    }).start();

    // Start scaling animation for the button
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Scale up to 1.1
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back to 1
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        {/* Logo and Title */}
        <Text style={styles.logoText}>Healix</Text>

        {/* Main Text */}
        <Text style={styles.title}>
          Striving to improve community health care and practices
        </Text>

        {/* Placeholder for Image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Placeholder</Text>
        </View>

        {/* Get Started Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')} // Adjust to the actual homepage route
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6FDBE9FF', // Solid background color
    padding: 16,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    paddingHorizontal: 16,
    lineHeight: 28,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
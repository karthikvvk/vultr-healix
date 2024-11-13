import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to show alert messages
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleExistingUser = async () => {
    if (!email || !password) {
      showAlert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.10.25.1:5000/api/auth/login', { email, password });
      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem('token', token); // Save JWT token
        showAlert('Login Successful', 'You are now logged in.');
        navigation.replace('Home'); // Navigate to Home if login is successful
      } else {
        showAlert('Error', 'No token received. Please try again.');
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', error.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewRegister = async () => {
    if (!username || !email || !phone || !password) {
      showAlert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.10.25.1:5000/api/auth/register', { username, email, password, phone });
      const token = response.data.token;
      console.log(token);
      if (token) {
        await AsyncStorage.setItem('token', token); // Save JWT token
        showAlert('Registration Successful', 'You are now registered and logged in.');
        navigation.replace('Home'); // Navigate to Home after successful registration
      } else {
        showAlert('Error', 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      showAlert('Error', error.response?.data?.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isRegistering ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <Button title="Register" onPress={handleNewRegister} disabled={loading} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <Button title="Sign In" onPress={handleExistingUser} disabled={loading} />
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.linkText}>
            {isRegistering ? 'Already have an account? Sign In' : 'New to the app? Register here'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 5,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  loader: {
    marginTop: 20,
  },
});

export default SignInPage;

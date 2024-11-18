import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({navigation}) => {
  const [screen, setScreen] = useState('login'); // Tracks login, signup, or otp screens
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const shakeAnim = useState(new Animated.Value(0))[0];


  // Trigger shake animation for input validation
  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const showAlert = (title, message) => Alert.alert(title, message);

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Error', 'Please enter both email and password.');
      shakeInput();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "success") {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home');
        setTimer(60);
        setResendEnabled(false);
      } else {
        showAlert('Error', data.message || 'An error occurred during login.');
      }
    } catch (error) {
      showAlert('Error', error.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign-up
  const handleSignUp = async () => {
    if (!username || !email || !phone || !password || password !== confirmPassword) {
      showAlert('Error', 'Please fill all fields and ensure passwords match.');
      shakeInput();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, phone })
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "success") {
        await AsyncStorage.setItem('token', data.token);
        showAlert('Signup successful! Please log in.');
        navigation.navigate('Home');
      } else {
        showAlert('Error', data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      showAlert('Error', error.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };



  // Render login form
  const renderLogin = () => (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <Text style={styles.title}>Login</Text>
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField icon="lock-closed" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <AuthButton text="Login" onPress={handleLogin} loading={loading} />
      <SwitchAuthText onPress={() => setScreen('signup')} text="Don't have an account? Sign Up" />
    </Animated.View>
  );

  // Render sign-up form
  const renderSignUp = () => (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <Text style={styles.title}>Sign Up</Text>
      <InputField icon="person" placeholder="Username" value={username} onChangeText={setUsername} />
      <InputField icon="mail" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField icon="call" placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField icon="lock-closed" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <InputField icon="lock-closed" placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <AuthButton text="Sign Up" onPress={handleSignUp} loading={loading} />
      <SwitchAuthText onPress={() => setScreen('login')} text="Already have an account? Login" />
    </Animated.View>
  );



  return (
    <View style={styles.wrapper}>
      {screen === 'login' && renderLogin()}
      {screen === 'signup' && renderSignUp()}
    </View>
  );
};

// Reusable Input Field with Icon
const InputField = ({ icon, secureTextEntry: isPasswordField, ...props }) => {
  const [isSecure, setIsSecure] = useState(isPasswordField);

  return (
    <View style={[styles.inputContainer, { alignItems: 'center' }]}>
      <Ionicons name={icon} size={20} color="#666" style={styles.icon} />
      <TextInput
        style={[styles.input, { marginRight: isPasswordField ? 10 : 0 }]}
        secureTextEntry={isPasswordField && isSecure}
        {...props}
      />
      {isPasswordField && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={{ padding: 5 }}
        >
          <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};


// Auth Button Component with updated color and size
const AuthButton = ({ text, onPress, loading }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{text}</Text>}
  </TouchableOpacity>
);

// Switch between login and signup
const SwitchAuthText = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f5f8',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 450,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  confirmInput: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
  },
  timerText: {
    color: '#666',
    marginBottom: 10,
  },
});

export default AuthScreen;

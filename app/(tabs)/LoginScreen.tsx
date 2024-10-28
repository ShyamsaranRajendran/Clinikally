import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList'; // Assuming this is correctly defined in another file
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('s@gamil.com');
  const [password, setPassword] = useState('dfg');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.159.209:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);  // Store token
        Alert.alert('Login Successful', 'Welcome back!');
        navigation.navigate('Home'); // Navigate to Home screen on success
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid email or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/logo.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Clinikally</Text>
      <Text style={styles.subtitle}>Your Health, Our Priority</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password and Sign Up buttons */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUp}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f4f8fb',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0984e3',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#0984e3',
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  signUp: {
    color: '#636e72',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

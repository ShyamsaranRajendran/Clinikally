import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    // Validate password match
    if (form.password !== form.confirmPassword) {
      Alert.alert('Registration Failed', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.159.209:5000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          username: form.username,
          phoneNumber: form.phoneNumber,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration Successful', data.success || 'You are successfully registered.');
        navigation.navigate('Login'); // Navigate to login on success
      } else {
        Alert.alert('Registration Failed', data.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {['name', 'email', 'username', 'phoneNumber', 'password', 'confirmPassword'].map((field, index) => (
        <TextInput
          key={index}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChangeText={(text) => setForm((prevForm) => ({ ...prevForm, [field]: text }))}
          style={styles.input}
          secureTextEntry={field.toLowerCase().includes('password')}
          autoCapitalize="none"
          keyboardType={field === 'email' ? 'email-address' : 'default'}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
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
});

export default RegistrationScreen;

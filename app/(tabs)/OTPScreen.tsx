import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('https://clinikally-07us.onrender.com/user/verify-otp', { // replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ OTP: otp }), // Send the OTP entered by the user
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong!');
      }

      // If verification is successful
      Alert.alert('Success', data.message); // Show success message
      // Proceed to reset password screen or other action
    } catch (error) {
      Alert.alert('Error', error.message); // Show error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f4f8fb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
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

export default OTPScreen;

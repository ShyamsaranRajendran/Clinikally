import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList1'; // Adjust the path if necessary
import axios from 'axios';

type PincodeInputRouteProp = RouteProp<RootStackParamList, 'PincodeInput'>;

const PincodeEstimate: React.FC = () => {
  const route = useRoute<PincodeInputRouteProp>();
  const { product } = route.params;

  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState(''); // State for name
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleEstimateDelivery = async () => {
    if (!pincode) {
      Alert.alert('Input Error', 'Please provide a Pincode.');
      return;
    }

    try {
      const response = await axios.post('https://clinikally-07us.onrender.com/api/estimateDeliveryDate', {
        productId: product["Product ID"],
        pincode,
      });
      const { estimatedDeliveryDate } = response.data;
      setEstimatedDeliveryDate(estimatedDeliveryDate);
      Alert.alert('Delivery Estimate', `Estimated Delivery Date: ${estimatedDeliveryDate}`);
    } catch (error) {
      Alert.alert('Not Found', 'No such pincode exists');
    }
  };

  const handleOrderConfirmation = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      Alert.alert('Input Error', 'Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('https://clinikally-07us.onrender.com/api/confirmOrder', {
        productId: product["Product ID"],
        name, // Include name in the request
        address,
        pincode,
        phoneNumber, // Include phone number in the request
      });
      setOrderConfirmed(true);
      Alert.alert('Order Confirmation', `Your order has been placed successfully!`);
    } catch (error) {
      Alert.alert('Order Failed', 'Unable to place the order. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Estimate Delivery Date</Text>

      <Text style={styles.productName}>{product["Product Name"] || 'Unnamed Product'}</Text>
      <Text style={styles.price}>Price: ${product.Price}</Text>
      <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.productImage} />

      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleEstimateDelivery}>
        <Text style={styles.buttonText}>Check Delivery Estimate</Text>
      </TouchableOpacity>

      {estimatedDeliveryDate ? (
        <Text style={styles.deliveryDate}>Estimated Delivery: {estimatedDeliveryDate}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Enter Delivery Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#888"
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name} // Bind name to state
        onChangeText={setName}
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phoneNumber} // Bind phone number to state
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.orderButton} onPress={handleOrderConfirmation}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>

      {orderConfirmed && (
        <Text style={styles.confirmationText}>Your order has been placed! Estimated delivery: {estimatedDeliveryDate}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f8fb',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 20,
    textAlign: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 15,
    textAlign: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe6e9',
    paddingVertical: 10,
    fontSize: 16,
    color: '#2d3436',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0984e3',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#00b894',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryDate: {
    fontSize: 16,
    color: '#2d3436',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  },
  confirmationText: {
    marginTop: 30,
    fontSize: 16,
    color: '#2d3436',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    textAlignVertical: 'center',
  },
});

export default PincodeEstimate;

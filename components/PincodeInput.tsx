import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Product } from './RootStackParamList1'; // Adjust the path if necessary
import axios from 'axios';

type PincodeInputRouteProp = RouteProp<RootStackParamList, 'PincodeInput'>;

const PincodeEstimate: React.FC = () => {
  const route = useRoute<PincodeInputRouteProp>();
  const { product } = route.params; // Access the product from route params

  const [pincode, setPincode] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');

  const handleEstimateDelivery = async () => {
    if (!pincode) {
      Alert.alert('Input Error', 'Please provide a Pincode.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.159.209:5000/api/estimateDeliveryDate', {
        productId: product["Product ID"], 
        pincode,
      });
      const { estimatedDeliveryDate } = response.data;
      setEstimatedDeliveryDate(estimatedDeliveryDate);
      Alert.alert('Delivery Estimate', `Estimated Delivery Date: ${estimatedDeliveryDate}`);
    } catch (error) {
      console.error('Error fetching delivery estimate:', error);
      Alert.alert('Error', `Failed to fetch delivery estimate. Please try again. ${error}`);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Estimate Delivery Date</Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{product["Product Name"] || 'Unnamed Product'}</Text>
      <Text style={{ fontSize: 16 }}>Price: ${product.Price}</Text>

      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />

      <Button title="Check Delivery Estimate" onPress={handleEstimateDelivery} />

      {estimatedDeliveryDate ? (
        <Text style={{ marginTop: 20 }}>Estimated Delivery Date: {estimatedDeliveryDate}</Text>
      ) : null}
    </View>
  );
};

export default PincodeEstimate;

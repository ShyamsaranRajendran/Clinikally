import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from './RootStackParamList1'; // Adjust the path if necessary
import axios from 'axios';

type PincodeInputRouteProp = RouteProp<RootStackParamList, 'PincodeInput'>;

const PincodeEstimate: React.FC = () => {
  const route = useRoute<PincodeInputRouteProp>();
  const { product } = route.params;

  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [cartItems, setCartItems] = useState(0); // State for cart count

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
      console.error('Error fetching delivery estimate:', error);
      Alert.alert('Error', `Failed to fetch delivery estimate. Please try again. ${error}`);
    }
  };

  const handleOrderConfirmation = async () => {
    if (!address || !pincode) {
      Alert.alert('Input Error', 'Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('https://clinikally-07us.onrender.com/api/confirmOrder', {
        productId: product["Product ID"],
        address,
        pincode,
      });
      setOrderConfirmed(true);
      setCartItems(cartItems + 1); // Increment cart items
      Alert.alert('Order Confirmation', `Your order has been placed successfully!`);
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Order Failed', 'Unable to place the order. Please try again.');
    }
  };

  const handleAddToCart = () => {
    setCartItems(cartItems + 1); // Increment cart items
    Alert.alert('Cart', 'Product added to cart!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Estimate Delivery Date</Text>
        <TouchableOpacity style={styles.cartIcon}>
          <Icon name="shopping-cart" size={28} color="#0984e3" />
          {cartItems > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartItems}</Text></View>}
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.orderButton} onPress={handleOrderConfirmation}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>

      {orderConfirmed && (
        <Text style={styles.confirmationText}>Your order has been placed! Estimated delivery: {estimatedDeliveryDate}</Text>
      )}

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  addToCartButton: {
    backgroundColor: '#ff6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
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

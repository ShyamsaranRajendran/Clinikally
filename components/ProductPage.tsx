import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local storage

const ProductPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const images = [
    require('@/assets/images/80.png'),
    require('@/assets/images/80.png'),
    require('@/assets/images/80.png'),
    require('@/assets/images/80.png'),
    require('@/assets/images/80.png'),
  ];

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };

  // Function to handle "Add to Cart" button press
  const handleAddToCart = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "You must be logged in to add items to the cart.");
        return;
      }

      const response = await axios.post(
        'http://192.168.159.209:5000/cart/add',
        { productId: product._id },
        { headers: { 'authorization': `Bearer ${token}` } }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Product added to cart successfully.");
      } else {
        Alert.alert("Error", "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Alert.alert("Error", "Failed to add product to cart.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clinikally</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={24} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <View style={styles.imageSlider}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={image} style={styles.productImage} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: activeIndex === index ? '#FF6B00' : '#ddd' },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Product Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.productTitle}>{product["Product Name"] || 'Unnamed Product'}</Text>
        <Text style={styles.productPrice}>₹ {product.Price}</Text>
        <Text style={styles.productDescription}>
          This is a high-quality product from Clinikally, designed to meet your needs.
        </Text>
        <Text style={styles.lowStockText}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
      </View>

      {/* Buy & Add to Cart Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buyNowButton, !product.inStock && styles.disabledButton]}
          onPress={() => navigation.navigate('PincodeInput', { product })}
          disabled={!product.inStock}
        >
          <Text style={styles.buttonText}>Buy it Now</Text>
        </TouchableOpacity>
      </View>
      {/* Other sections remain unchanged */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageSlider: {
    height: 300,
    width: '100%',
    padding: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width, // Make each container the width of the screen
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally
    maxWidth: '100%'
  },
  productImage: {
    height: '100%', // Adjust height to fill the container
    width: '80%', // Adjust width to fill the container, can be changed as needed
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: '#FF6B00',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  lowStockText: {
    color: 'red',
    fontSize: 14,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buyNowButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
});

export default ProductPage;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList'; // Assuming this is correctly defined in another file


const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* Top Icon Section */}
      <View style={styles.iconSection}>
        {/* Using specific icons for each feature with onPress */}
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="tag" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="truck" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Exchange')}>
          <FontAwesome name="exchange" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Cart')}>
          <FontAwesome name="shopping-cart" size={24} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner Section */}
      <View style={styles.bannerSection}>
        <Image source={require('@/assets/images/promo-banner.jpeg')} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Special Offer: Get 20% off on your first purchase!</Text>
      </View>

      {/* Latest Collections Section */}
      <View style={styles.collectionsSection}>
        <Text style={styles.sectionTitle}>Latest Collections</Text>
        {[
          { name: 'Dramatically Moisturizing Lotion', items: '50 items' },
          { name: 'Hydraluminous Water Surge Gel Cream', items: '50 items' },
          { name: 'Soothing Face Mist', items: '30 items' }
        ].map((item, index) => (
          <View key={index} style={styles.collectionItem}>
            <Image source={require('@/assets/images/model1.png')} style={styles.collectionImage} />
            <View style={styles.collectionsSection1}>
              <Text style={styles.collectionName}>{item.name}</Text>
              <Text style={styles.collectionItems}>{item.items}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Featured Products Section */}
      <View style={styles.featuredProductsSection}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        {[
          { name: 'Nourishing Body Cream', price: '$25', image: require('@/assets/images/model2.png') },
          { name: 'Revitalizing Face Serum', price: '$30', image: require('@/assets/images/model1.png') },
          { name: 'Gentle Exfoliating Scrub', price: '$20', image: require('@/assets/images/model2.png') },
          { name: 'Revitalizing Face Serum', price: '$60', image: require('@/assets/images/model1.png') },
          { name: 'Revitalizing Face Serum', price: '$30', image: require('@/assets/images/model1.png') },
          { name: 'Gentle Exfoliating Scrub', price: '$20', image: require('@/assets/images/model2.png') },
        ].map((product, index) => (
          <View key={index} style={styles.featuredProductItem}>
            <Image source={product.image} style={styles.featuredProductImage} />
            <Text style={styles.featuredProductName}>{product.name}</Text>
            <Text style={styles.featuredProductPrice}>{product.price}</Text>
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>FT BEAUTY SKIN CARE</Text>
        <Text style={styles.footerText}>Address: 123 Main St, Anytown, USA</Text>
        <Text style={styles.footerText}>Contact: contact@ftbeauty.com</Text>
        <Text style={styles.footerText}>Office Hours: Mon - Fri, 9 AM - 6 PM</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    paddingHorizontal: 10,
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFF0E0',
  },
  iconContainer: {
    alignItems: 'center',
  },
  bannerSection: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  bannerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  collectionsSection: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  collectionsSection1: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  collectionImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  collectionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  collectionItems: {
    fontSize: 12,
    color: '#777',
  },
  featuredProductsSection: {
      padding: 20,
  backgroundColor: '#FFF',
  marginBottom: 20,
  flexDirection: 'row',
  flexWrap: 'wrap',     
  justifyContent: 'space-between', 
  },
  featuredProductItem: {
    width: '48%',         
  alignItems: 'center',
  marginBottom: 15,
  },
  featuredProductImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  featuredProductName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  featuredProductPrice: {
    fontSize: 14,
    color: '#FF6B00',
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  footerText: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default HomeScreen;

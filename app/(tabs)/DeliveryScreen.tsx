import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from './_layout';

const SkincareScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* Top Icon Section */}
      <View style={styles.iconSection}>
        {/* Icons with navigation on press */}
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="sun-o" size={24} color="#FF6B00" />
          <Text style={styles.iconText}>Sun Care</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="leaf" size={24} color="#FF6B00" />
          <Text style={styles.iconText}>Organic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="magic" size={24} color="#FF6B00" />
          <Text style={styles.iconText}>Anti-Aging</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="heart" size={24} color="#FF6B00" />
          <Text style={styles.iconText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Collection Section */}
      <View style={styles.collectionsSection}>
        <Text style={styles.sectionTitle}>Featured Skincare Collections</Text>
        <View style={styles.collectionItem}>
          <Image style={styles.collectionImage} source={{ uri: 'https://via.placeholder.com/60' }} />
          <View>
            <Text style={styles.collectionName}>Hydration Essentials</Text>
            <Text style={styles.collectionItems}>15 products</Text>
          </View>
        </View>
        <View style={styles.collectionItem}>
          <Image style={styles.collectionImage} source={{ uri: 'https://via.placeholder.com/60' }} />
          <View>
            <Text style={styles.collectionName}>Acne Control Kit</Text>
            <Text style={styles.collectionItems}>10 products</Text>
          </View>
        </View>
      </View>

      {/* Testimonial Section */}
      <View style={styles.testimonialSection}>
        <Text style={styles.quote}>
          "These products transformed my skin! My complexion has never looked better."
        </Text>
        <Image style={styles.testimonialImage} source={{ uri: 'https://via.placeholder.com/60' }} />
        <Text style={styles.testimonialAuthor}>Sarah K.</Text>
      </View>

      {/* Newsletter Subscription Section */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Join our Skincare Community</Text>
        <Text style={styles.newsletterDescription}>
          Receive exclusive offers and skincare tips straight to your inbox!
        </Text>
        <TextInput placeholder="Enter your email" style={styles.emailInput} />
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Skincare Haven. All rights reserved.</Text>
        <Text style={styles.footerText}>Privacy Policy | Terms of Service</Text>
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
  iconText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  collectionsSection: {
    padding: 20,
    backgroundColor: '#FFF',
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
  testimonialSection: {
    padding: 20,
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  newsletterSection: {
    backgroundColor: '#FFE6E6',
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 15,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  newsletterDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  emailInput: {
    width: '80%',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  subscribeButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  subscribeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default SkincareScreen;

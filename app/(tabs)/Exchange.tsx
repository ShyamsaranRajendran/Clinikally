import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList'; // Assuming this is correctly defined in another file

const Exchange = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      {/* Top Icon Section */}
      <View style={styles.iconSection}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="leaf" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="truck" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Exchange')}>
          <FontAwesome name="exchange" size={24} color="#FF6B00" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ProductList')}>
          <FontAwesome name="life-ring" size={24} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* Collections Section */}
      <View style={styles.collectionsSection}>
        <Text style={styles.sectionTitle}>Our Skincare Collections</Text>
        <View style={styles.collectionItem}>
          <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.collectionImage} />
          <View>
            <Text style={styles.collectionName}>Hydrating Collection</Text>
            <Text style={styles.collectionItems}>30 items</Text>
          </View>
        </View>
        <View style={styles.collectionItem}>
          <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.collectionImage} />
          <View>
            <Text style={styles.collectionName}>Anti-Aging Collection</Text>
            <Text style={styles.collectionItems}>50 items</Text>
          </View>
        </View>
      </View>

      {/* Testimonials Section */}
      <View style={styles.testimonialSection}>
        <Text style={styles.sectionTitle}>What Our Customers Say</Text>
        <Text style={styles.quote}>“My skin has never felt softer and more radiant!”</Text>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.testimonialImage} />
        <Text style={styles.testimonialAuthor}>- Sarah L.</Text>
      </View>

      {/* Newsletter Section */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Join Our Skincare Newsletter</Text>
        <Text style={styles.newsletterDescription}>Get beauty tips, updates, and exclusive offers.</Text>
        <TextInput style={styles.emailInput} placeholder="Enter your email" keyboardType="email-address" />
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Skincare Co.</Text>
        <Text style={styles.footerText}>All Rights Reserved</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#F1F1F1',
  },
  iconContainer: {
    alignItems: 'center',
  },
  collectionsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
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
    color: '#444',
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
    color: '#444',
  },
  newsletterSection: {
    backgroundColor: '#FCE4EC',
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 15,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
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
    backgroundColor: '#A8E6CF',
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

export default Exchange;

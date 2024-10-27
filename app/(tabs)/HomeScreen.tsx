import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from './_layout';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/background.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Clinikally</Text>
      <Text style={styles.description}>
        Personalized healthcare services, just a tap away. Explore your health insights and manage appointments with ease.
      </Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>View Services</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#636e72',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#0984e3',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

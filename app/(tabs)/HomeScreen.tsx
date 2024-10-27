import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
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
      <Text style={styles.title}>Welcome to Fast Delivery</Text>
      <Text style={styles.description}>
        Check estimated delivery times for your favorite products based on your location!
      </Text>
      <Button
        title="ProductList"
        onPress={() => navigation.navigate('ProductList')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
});

export default HomeScreen;

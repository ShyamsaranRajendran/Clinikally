import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from './_layout';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'test@gmail.com' || password === 'password123') {
       navigation.navigate('Home');
    } else {
       Alert.alert('Please enter your email and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sub}>test@gmail.com</Text>
      <Text style={styles.sub}>password123</Text>
      <Image 
        source={require('@/assets/images/background.jpeg')} 
        style={styles.image}
      />
      <Text style={styles.title}>Login to Fast Delivery</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}  
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  sub:{
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,

  }
});

export default LoginScreen;

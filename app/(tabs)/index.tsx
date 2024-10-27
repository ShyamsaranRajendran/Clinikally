import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProductList from '@/components/ProductList';
import PincodeInput from '@/components/PincodeInput';
import DeliveryEstimate from '@/components/DeliveryEstimate';

export type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  PincodeInput: { product: { id: number; name: string; inStock: boolean; price: string; category: string } };
  DeliveryEstimate: { product: { id: number; name: string }, pincode: string, provider: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome to DeliveryApp' }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name="PincodeInput"
          component={PincodeInput}
          options={{ title: 'Enter Pincode' }}
        />
        <Stack.Screen
          name="DeliveryEstimate"
          component={DeliveryEstimate}
          options={{ title: 'Delivery Estimate' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

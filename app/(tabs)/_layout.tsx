// Layout.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../../components/ProductList';
import PincodeInput from '../../components/PincodeInput';
import DeliveryEstimate from '../../components/DeliveryEstimate';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import DeliveryPage from './DeliveryScreen';
import Exchange from './Exchange';
import ProductPage from '../../components/ProductPage';
import { RootStackParamList } from './RootStackParamList'; // Assuming this is correctly defined in another file
import Cart from './Cart';
// Ensure all necessary imports
import RegistrationScreen from './RegistrationScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import OTPScreen from './OTPScreen';
import ResetPasswordScreen from './ResetPasswordScreen.tsx';

export interface Product {
  _id: { $oid: string };
  "Product ID": number;
  "Product Name": string;
  Price: number;
  imageUrl: string;
  lowStock: boolean;
  size: number;
  inStock: boolean;
}

const Stack = createStackNavigator<RootStackParamList>(); // Use StackParamList for type safety

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
      <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: 'Register' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="OTP" component={OTPScreen} options={{ title: 'OTP' }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ title: 'Reset Password' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
      <Stack.Screen name="ProductPage" component={ProductPage} options={{ title: 'Product Page' }} />
      <Stack.Screen name="DeliveryPage" component={DeliveryPage} options={{ title: 'Orders' }} />
            <Stack.Screen name="Cart" component={Cart} options={{ title: 'Cart' }} />

      <Stack.Screen name="Exchange" component={Exchange} options={{ title: 'Exchange' }} />
      <Stack.Screen name="PincodeInput" component={PincodeInput} options={{ title: 'Enter Pincode' }} />
      <Stack.Screen name="DeliveryEstimate" component={DeliveryEstimate} options={{ title: 'Delivery Estimate' }} />
    </Stack.Navigator>
  );
}

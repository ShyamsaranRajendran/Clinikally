import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../../components/ProductList';
import PincodeInput from '../../components/PincodeInput';
import DeliveryEstimate from '../../components/DeliveryEstimate';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
export type StackParamList = {
  Login: undefined;
  Home: undefined; // Define your Home screen route
  ProductList: undefined; // Add other routes
  PincodeInput: undefined;
  DeliveryEstimate: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export default function Layout() {
  return (
    // <Stack.Navigator
    //   initialRouteName="ProductList"
    //   screenOptions={{
    //     headerStyle: { backgroundColor: '#A1CEDC' },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: { fontWeight: 'bold' },
    //   }}
    // >
    //   <Stack.Screen
    //     name="ProductList"
    //     component={ProductList}
    //     options={{ title: 'Products' }}
    //   />
    //   <Stack.Screen
    //     name="PincodeInput"
    //     component={PincodeInput}
    //     options={{ title: 'Enter Pincode' }}
    //   />
    //   <Stack.Screen
    //     name="DeliveryEstimate"
    //     component={DeliveryEstimate}
    //     options={{ title: 'Delivery Estimate' }}
    //   />
    // </Stack.Navigator>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
  <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
  <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
  <Stack.Screen name="PincodeInput" component={PincodeInput} options={{ title: 'Enter Pincode' }} />
  <Stack.Screen name="DeliveryEstimate" component={DeliveryEstimate} options={{ title: 'Delivery Estimate' }} />
</Stack.Navigator>

  );
}

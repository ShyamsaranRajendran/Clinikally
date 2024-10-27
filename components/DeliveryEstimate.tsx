import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';


interface Product {
  id: number;
  name: string;
  inStock: boolean;
}

interface RouteParams {
  product: Product;
  pincode: string;
  provider: string;
}

const DeliveryEstimate = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { product, pincode, provider } = route.params;

  const [deliveryDate, setDeliveryDate] = useState('');
  const [timer, setTimer] = useState('');

  useEffect(() => {
    calculateDeliveryDate();
    if (provider === 'ProviderA' || provider === 'ProviderB') {
      startCountdownTimer();
    }
  }, []);

  const calculateDeliveryDate = () => {
    const now = new Date();
    const cutoffA = 17;
    const cutoffB = 9;

    if (provider === 'ProviderA' && product.inStock && now.getHours() < cutoffA) {
      setDeliveryDate('Today');
    } else if (provider === 'ProviderB') {
      setDeliveryDate(now.getHours() < cutoffB ? 'Today' : 'Tomorrow');
    } else {
      const daysToAdd = determineDaysForGeneralPartners(pincode);
      const estimatedDate = new Date();
      estimatedDate.setDate(now.getDate() + daysToAdd);
      setDeliveryDate(estimatedDate.toDateString());
    }
  };

  const startCountdownTimer = () => {
    const endHour = provider === 'ProviderA' ? 17 : 9;
    const endOfDay = new Date().setHours(endHour, 0, 0, 0);

    const interval = setInterval(() => {
      const timeLeft = (endOfDay - Date.now()) / 1000;
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimer('Time for same-day delivery has expired.');
      } else {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = Math.floor(timeLeft % 60);
        setTimer(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  const determineDaysForGeneralPartners = (pincode: string): number => {
    if (pincode.startsWith('1') || pincode.startsWith('2')) {
      return 2;
    } else if (pincode.startsWith('3') || pincode.startsWith('4')) {
      return 3; 
    } else {
      return 5;
    }
  };

  return (
    <View>
      <Text>Delivery Estimate for {product.name}:</Text>
      <Text>{deliveryDate}</Text>
      {timer && <Text>Time left for same-day delivery: {timer}</Text>}
    </View>
  );
};

export default DeliveryEstimate;

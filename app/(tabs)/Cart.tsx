import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CartItem } from './RootStackParamList'; // Ensure this type is correctly defined

const CartScreen = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get('http://192.168.159.209:5000/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data); // Check the structure of the response
                setCartItems(response.data.items);
            } catch (err) {
                console.error(err);
                setError('Error fetching cart items.');
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (cartItemId: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`http://192.168.159.209:5000/cart/remove/${cartItemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(cartItems.filter(item => item._id !== cartItemId));
            Alert.alert('Success', 'Item removed from cart.');
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Error removing item from cart.');
        }
    };

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemContainer}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/60' }} // Use a placeholder image URL
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{item.productName || "Unknown Product"}</Text>
                    <Text style={styles.productPrice}>Price: ${item.productPrice.toFixed(2)}</Text>
                    <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                    <Button
                        title="Remove"
                        onPress={() => handleRemoveItem(item._id)} // Use the correct cart item ID
                    />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={renderCartItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    cartItem: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
    },
    itemContainer: {
        flexDirection: 'row',  // Aligns children in a row
        alignItems: 'center',   // Vertically centers the image and text
    },
    productImage: {
        width: 100,  // Adjust the width and height as needed
        height: 100,
        marginRight: 16, // Adds space between the image and text
    },
    detailsContainer: {
        flex: 1,  // Allows the details container to take the remaining space
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
});

export default CartScreen;

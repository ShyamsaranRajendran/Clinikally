import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet, Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Product } from './RootStackParamList1';
import axios from 'axios';

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductList = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (query = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`https://clinikally-07us.onrender.com/api/product?page=${page}&limit=10&search=${query}`);
      const fetchedProducts = response.data.products;

      if (fetchedProducts && fetchedProducts.length) {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      Alert.alert('Not Found', 'No such product exists');

    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setProducts([]);
    setPage(1);
    fetchProducts(text);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    if (hasMore && !loading) {
      fetchProducts(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item._id?.$oid || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.productContainer, !item.inStock && styles.outOfStock]}
            onPress={() => item.inStock && navigation.navigate('PincodeInput', { product: item })}
            disabled={!item.inStock}
          >
            <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.productImage} />
            <Text style={styles.productName}>{item["Product Name"] || 'Unnamed Product'}</Text>
            <Text style={styles.productPrice}>${item.Price}</Text>
            {!item.inStock && <Text style={styles.outOfStockText}>Out of Stock</Text>}
          </TouchableOpacity>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#FF6B00" /> : null}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B00',
    marginTop: 5,
  },
  outOfStock: {
    backgroundColor: '#f8d7da',
    opacity: 0.8,
    borderColor: '#f5c6cb',
  },
  outOfStockText: {
    color: '#721c24',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ProductList;

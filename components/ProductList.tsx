import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
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
      const response = await axios.get(`http://192.168.159.209:5000/api/product?page=${page}&limit=10&search=${query}`);
      const fetchedProducts = response.data.products;

      if (fetchedProducts && fetchedProducts.length) {
        setProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
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
            <Text style={styles.productName}>{item["Product Name"] || 'Unnamed Product'}</Text>
            <Text style={styles.productPrice}>Price: ${item.Price}</Text>
            {!item.inStock && <Text style={styles.outOfStockText}>Out of Stock</Text>}
          </TouchableOpacity>
        )}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 15,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F15B34',
  },
  productPrice: {
    color: '#F2C43A',
    fontWeight: 'bold',
  },
  outOfStock: {
    backgroundColor: '#f8d7da',
    opacity: 0.6,
  },
  outOfStockText: {
    color: '#721c24',
    fontWeight: 'bold',
  },
});

export default ProductList;

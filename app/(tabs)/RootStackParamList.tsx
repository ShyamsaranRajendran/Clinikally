// RootStackParamList.ts

// Define the Product interface with all necessary properties
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

export interface CartItem {
  _id: string; // Cart item's unique identifier
  userId: string; // User ID associated with the cart item
  productId: string; // Product ID as a string
  productName: string; // Product name as a string
  productPrice: number; // Price of the product
  quantity: number; // Quantity of the product in the cart
}


// Define RootStackParamList which specifies the parameters for each screen
export type RootStackParamList = {
  ProductList: undefined;                // ProductList screen expects no parameters
  PincodeInput: { product: Product };    // PincodeInput screen expects a product parameter
  ProductPage: { product: Product };     // ProductPage screen expects a product parameter
  DeliveryPage: { product: Product };    // DeliveryPage screen expects a product parameter
  Login: undefined;                      // Login screen expects no parameters
  Home: undefined;                       // Home screen expects no parameters
  DeliveryEstimate: undefined;           // DeliveryEstimate screen expects no parameters
  Exchange: undefined;                   // Exchange screen expects no parameters
  Register: undefined;                   // Register screen expects no parameters
};

// Export the RootStackParamList type for use in other parts of the application
export default RootStackParamList;

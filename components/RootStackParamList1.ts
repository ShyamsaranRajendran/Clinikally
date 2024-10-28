// RootStackParamList.ts

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


export type RootStackParamList = {
  ProductList: undefined;
  PincodeInput: { product: Product };
  ProductPage: { product: Product };
  DeliveryPage: { product: Product };
};

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

// RootStackParamList.ts

export type RootStackParamList = {
  ProductList: undefined;
  PincodeInput: { product: Product };
};

export interface Product {
  _id: { $oid: string };
  "Product ID": number;
  "Product Name": string;
  Price: number;
      inStock: boolean; // Add this line to include inStock property

}


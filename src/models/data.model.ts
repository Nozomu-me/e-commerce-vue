export interface ProductColor {
  value: string;
  name: string;
}

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  priceSign: string;
  currency: string;
  image: string;
  description: string;
  rating: number;
  category: string;
  productType: string;
  tagList: string[];
  productColors: ProductColor[];
}

export interface CartProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  selectedColor: string;
}

export interface Cart {
  products: CartProduct[];
  totalPrice: number;
}

export interface Payment {
  cardNumber: string;
  cardOwner: string;
}

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cart: Cart;
  payment: Payment;
  shippingAdress: string;
}

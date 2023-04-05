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
  id?: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  quantity: number;
}

export interface Cart {
  cartProducts: CartProduct[];
  totalPrice: number;
}

export interface Payment {
  cardNumber: string;
  cardOwner: string;
  expiration: string;
}

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cart: Cart;
  payment: Payment;
  shippingAddress: string;
}

export interface Order {
  orderId?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cart: Cart;
  payment: Payment;
  shippingAddress: string;
}

import { Customer, Order, Product } from './../models/data.model';
import axios from 'axios';
const API_URL = ' http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getProducts() {
    return apiClient.get('/products');
  },
  getProductsLimit(start: number, end: number) {
    return apiClient.get(`/products?_start=${start}&_end=${end}`);
  },
  getProductById(id: number) {
    return apiClient.get(`/products/${id}`);
  },
  updateProduct(id: number, product: Product) {
    return apiClient.put(`/products/${id}`, product);
  },
  getCategory(category: string, limit: number) {
    return apiClient.get(`/products?category=${category}&_limit=${limit}`);
  },
  getCustomers() {
    return apiClient.get('/customers');
  },
  postCustomer(customer: Customer) {
    return apiClient.post('customers', customer);
  },
  getCustomerByEmail(email: string) {
    return apiClient.get(`/customers?email=${email}`);
  },
  updateCustomer(id: number, customer: Customer) {
    return apiClient.put(`customers/${id}`, customer);
  },
  postOrder(order: Order) {
    return apiClient.post('/orders', order);
  },
  filterProducts(key: string, value: string) {
    return apiClient.get(`products?${key}=${value}`);
  },
};

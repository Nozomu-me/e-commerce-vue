import { Customer } from './../models/data.model';
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
  getProductById(id: number) {
    return apiClient.get(`/products/${id}`);
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
};

import {
  Product,
  ProductColor,
  Customer,
  Cart,
  Payment,
  CartProduct,
} from './../models/data.model';
import Vue from 'vue';
import Vuex from 'vuex';
import { mutationTypes } from './mutation-types';
import ecomService from '../services/ecomService';

Vue.use(Vuex);

interface State {
  products: Product[];
  product?: Product;
  customer?: Customer;
  customers: Customer[];
}
export default new Vuex.Store<State>({
  state: {
    products: [],
    customers: [],
    customer: undefined,
  },
  getters: {},
  mutations: {
    [mutationTypes.GET_PRODUCTS](state) {
      ecomService.getProducts().then((res) => {
        for (let el of res.data) {
          let {
            id,
            brand,
            name,
            price,
            price_sign: priceSign,
            currency,
            image_link: image,
            description,
            rating,
            category,
            product_type: productType,
            tag_list: tagList,
            product_colors,
          } = el;
          let productColors: ProductColor[] = [];
          for (let el of product_colors) {
            let { hex_value: value, colour_name: name } = el;
            productColors.push({ value, name });
          }
          state.products.push({
            id,
            brand,
            name,
            price,
            priceSign,
            currency,
            image,
            description,
            rating,
            category,
            productType,
            tagList,
            productColors,
          });
        }
      });
    },

    [mutationTypes.POST_CUSTOMER](
      state,
      { firstName, lastName, email, phoneNumber }
    ) {
      let customer: Customer;
      let products: CartProduct[] = [];
      let cart: Cart = { products, totalPrice: 0 };
      let payment: Payment = { cardNumber: '', cardOwner: '' };
      customer = {
        firstName,
        lastName,
        email,
        phoneNumber,
        cart,
        payment,
        shippingAdress: '',
      };
      state.customer = customer;
      ecomService.postCustomer(customer);
    },
    [mutationTypes.GET_CUSTOMER_BY_EMAIL](state, { email }) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data;
      });
    },
    // [mutationTypes.LOGIN_CUSTOMER](state, payload) {
    //   state.customer = payload[0];
    // },
  },
  actions: {
    getProducts({ commit }) {
      commit(mutationTypes.GET_PRODUCTS);
    },
    registerCustomer({ commit }, payload) {
      commit(mutationTypes.POST_CUSTOMER, payload);
    },
    GetCustomerByEmail({ commit }, payload) {
      commit(mutationTypes.GET_CUSTOMER_BY_EMAIL, payload);
    },
    // loginCustomer({ commit }, payload) {
    //   commit(mutationTypes.LOGIN_CUSTOMER, payload);
    // },
  },
  modules: {},
});

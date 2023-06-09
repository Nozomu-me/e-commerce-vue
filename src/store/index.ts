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

import { vm } from '@/main';

Vue.use(Vuex);
interface State {
  products: Product[];
  product?: Product;
  customer?: Customer;
  customers: Customer[];
  loading: boolean;
  cartProducts: CartProduct[];
}
export default new Vuex.Store<State>({
  state: {
    products: [],
    customers: [],
    customer: undefined,
    loading: false,
    product: undefined,
    cartProducts: [],
  },
  getters: {},
  mutations: {
    [mutationTypes.GET_PRODUCTS](state) {
      state.loading = true;
      state.products = [];
      ecomService
        .getProducts()
        .then((res) => {
          for (let el of res.data) {
            let {
              id,
              brand,
              reviews,
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
              reviews,
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
        })
        .catch((err) => console.log(err))
        .finally(() => (state.loading = false));
    },
    [mutationTypes.GET_PRODUCT_BY_ID](state, { id }) {
      state.loading = true;
      ecomService
        .getProductById(id)
        .then((res) => {
          let {
            id,
            reviews,
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
          } = res.data;
          let productColors = [];
          for (let el of product_colors) {
            let { hex_value: value, colour_name: name } = el;
            productColors.push({ value, name });
          }
          state.product = {
            id,
            reviews,
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
          };
        })
        .catch((err) => console.log(err))
        .finally(() => (state.loading = false));
    },
    [mutationTypes.UPADATE_PRODUCT](state, { id, product }) {
      ecomService
        .updateProduct(id, product)
        .then((res) => {
          state.product = res.data;
        })
        .catch((err) => console.log(err));
    },
    [mutationTypes.POST_CUSTOMER](
      state,
      { firstName, lastName, email, password, phoneNumber }
    ) {
      let customer: Customer;
      let cartProducts: CartProduct[] = [];
      let cart: Cart = { cartProducts, totalPrice: 0 };
      let payment: Payment = { cardNumber: '', cardOwner: '', expiration: '' };
      customer = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        cart,
        payment,
        shippingAddress: '',
      };

      ecomService
        .postCustomer(customer)
        .then((res) => {
          state.customer = res.data;
          localStorage.setItem('email', email);
          vm.$router.go(0);
        })
        .catch((err) => console.log(err));
    },
    [mutationTypes.GET_CUSTOMER_BY_EMAIL](state, { email }) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];
        localStorage.setItem('email', res.data[0]?.email);
      });
    },
    async [mutationTypes.ADD_TO_CART](
      state,
      { email, cartProduct: newCartProduct }
    ) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];
        let {
          cart: { cartProducts },
        } = state.customer as Customer;

        let ret: CartProduct[] = [];
        let exist = false;
        for (let el of cartProducts) {
          if (el.name === newCartProduct.name) {
            ret.push({ ...el, quantity: el.quantity + 1 });
            exist = true;
          } else {
            ret.push(el);
          }
        }

        if (exist === false) {
          ret.push(newCartProduct);
        }
        let newCustomer: Customer;
        newCustomer = {
          ...state.customer,

          cart: {
            ...state.customer?.cart,
            totalPrice: res.data[0].cart.totalPrice + +newCartProduct.price,
            cartProducts: ret,
          } as Cart,
        } as Customer;
        ecomService
          .updateCustomer(newCustomer.id as number, newCustomer)
          .then((res) => {
            state.customer = res.data;
          })
          .catch((err) => console.log(err))
          .finally(() => {});
      });
    },
    [mutationTypes.UPDATE_CART](state, { email, cartProduct }) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];
        let newCartProducts: CartProduct[] | undefined;
        let total = 0;
        newCartProducts = state.customer?.cart.cartProducts.map((el) => {
          if (el.name === cartProduct.name) {
            {
              total += cartProduct.quantity * +cartProduct.price;
              return cartProduct;
            }
          } else {
            total += el.quantity * +el.price;
            return el;
          }
        });
        ecomService
          .updateCustomer(
            state.customer?.id as number,
            {
              ...state.customer,
              cart: {
                ...state.customer?.cart,
                cartProducts: newCartProducts,
                totalPrice: total,
              },
            } as Customer
          )
          .then((res) => (state.customer = res.data));
      });
    },
    [mutationTypes.DELETE_PRODUCT](state, { email, cartProduct }) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];

        let newCartProducts: CartProduct[] | undefined;
        let total = 0;
        newCartProducts = state.customer?.cart.cartProducts.filter((el) => {
          if (el.name !== cartProduct.name) {
            {
              total += el.quantity * +el.price;
              return el;
            }
          }
        }) as CartProduct[];
        ecomService
          .updateCustomer(
            state.customer?.id as number,
            {
              ...state.customer,
              cart: {
                ...state.customer?.cart,
                cartProducts: newCartProducts,
                totalPrice: total,
              },
            } as Customer
          )
          .then((res) => {
            state.customer = res.data;
          });
      });
    },
    [mutationTypes.UPDATE_CUSTOMER](state, payload) {
      const customer: Customer = payload;
      ecomService
        .updateCustomer(customer.id as number, customer)
        .then((res) => {
          state.customer = res.data;
        });
    },
    [mutationTypes.FILTER_PRODUCTS](state, { key, value }) {
      state.loading = true;
      ecomService
        .filterProducts(key, value)
        .then((res) => {
          state.products = [];
          for (let el of res.data) {
            let {
              id,
              reviews,
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
              reviews,
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
        })
        .then((err) => console.log(err))
        .finally(() => (state.loading = false));
    },
  },
  actions: {
    getProducts({ commit }) {
      commit(mutationTypes.GET_PRODUCTS);
    },
    getProductById({ commit }, payload) {
      commit(mutationTypes.GET_PRODUCT_BY_ID, payload);
    },
    updateProduct({ commit }, payload) {
      commit(mutationTypes.UPADATE_PRODUCT, payload);
    },
    registerCustomer({ commit }, payload) {
      commit(mutationTypes.POST_CUSTOMER, payload);
    },
    getCustomerByEmail({ commit }, payload) {
      commit(mutationTypes.GET_CUSTOMER_BY_EMAIL, payload);
    },
    updateCustomer({ commit }, payload) {
      commit(mutationTypes.UPDATE_CUSTOMER, payload);
    },
    addToCart({ commit }, payload) {
      commit(mutationTypes.ADD_TO_CART, payload);
    },
    updateCart({ commit }, payload) {
      commit(mutationTypes.UPDATE_CART, payload);
    },
    deleteProduct({ commit }, payload) {
      commit(mutationTypes.DELETE_PRODUCT, payload);
    },
    filterProducts({ commit }, payload) {
      commit(mutationTypes.FILTER_PRODUCTS, payload);
    },
  },
  modules: {},
});

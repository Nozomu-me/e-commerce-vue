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
      ecomService
        .getProducts()
        .then((res) => {
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
    [mutationTypes.POST_CUSTOMER](
      state,
      { firstName, lastName, email, phoneNumber }
    ) {
      let customer: Customer;
      let cartProducts: CartProduct[] = [];
      let cart: Cart = { cartProducts, totalPrice: 0, confirmed: false };
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
        state.customer = res.data[0];
      });
    },
    [mutationTypes.ADD_TO_CART](state, { email, cartProduct: newCartProduct }) {
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];
        let {
          cart: { cartProducts },
        } = state.customer as Customer;

        console.log(cartProducts);
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
            state.customer = res.data[0];
          });
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
          .then((res) => (state.customer = res.data[0]));
      });
    },
    [mutationTypes.DELETE_PRODUCT](state, { email, cartProduct }) {
      console.log(cartProduct);
      ecomService.getCustomerByEmail(email).then((res) => {
        state.customer = res.data[0];
        let newCartProducts: CartProduct[] | undefined;
        let total = 0;
        newCartProducts = state.customer?.cart.cartProducts.map((el) => {
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
          .then((res) => (state.customer = res.data[0]));
      });
    },
  },
  actions: {
    getProducts({ commit }) {
      commit(mutationTypes.GET_PRODUCTS);
    },
    getProductById({ commit }, payload) {
      commit(mutationTypes.GET_PRODUCT_BY_ID, payload);
    },
    registerCustomer({ commit }, payload) {
      commit(mutationTypes.POST_CUSTOMER, payload);
    },
    getCustomerByEmail({ commit }, payload) {
      commit(mutationTypes.GET_CUSTOMER_BY_EMAIL, payload);
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
  },
  modules: {},
});

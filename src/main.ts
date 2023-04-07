import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faRightFromBracket,
  faTrash,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons';

// export const API_URL = ' http://localhost:5000';
// export const API_URL =
//   'https://ecom-vue-json-server-git-main-nozomu-me.vercel.app/';
library.add(
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faRightFromBracket,
  faTrash,
  faBasketShopping
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export { vm };

<template>
  <div class="container">
    <nav class="navbar">
      <div class="logo">
        <img
          src="https://us.123rf.com/450wm/mayrum/mayrum1906/mayrum190600016/125095506-beauty-makeup-artist-logo-crossed-brushes-vector-illustration.jpg"
        />
      </div>
      <div class="links">
        <router-link :to="{ name: 'home' }" class="link">Home</router-link>
        <router-link :to="{ name: 'products' }" class="link"
          >products</router-link
        >
      </div>
      <div class="icons">
        <button @click.prevent="handleClick">
          <font-awesome-icon :icon="['fas', 'user']" class="icon user-icon" />
        </button>
        <!-- <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon" /> -->
        <router-link :to="{ name: 'cart' }">
          <div class="cart" v-show="loged">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon" />
            <div class="products-nbr">
              {{ $store.state.customer?.cart.cartProducts.length }}
            </div>
          </div>
        </router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import Modal from '../components/Modal.vue';
import Button from './Button.vue';
import { mapState } from 'vuex';
export default {
  props: ['loged'],
  components: {
    Modal,
    Button,
  },
  data() {
    return { show: false, data: null };
  },
  // computed: mapState(['customer']),
  created() {
    this.$store.dispatch('getCustomerByEmail', {
      email: localStorage.getItem('email'),
    });
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      this.$emit('show', this.show);
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.navbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  background-color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
}

.logo {
  justify-self: start;
  padding: 5px;
}
img {
  height: 60px;
  width: 60px;
}
.links {
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
}
.link {
  all: unset;
  cursor: pointer;
}
.link:hover {
  color: #5d3fd3;
  font-weight: bold;
}
.icons {
  display: flex;
  justify-content: end;
  padding-right: 40px;
  gap: 5px;
}
.icon {
  width: 30px;
  height: 20px;
  color: #5d3fd3;
}
.user-icon {
  cursor: pointer;
}
button {
  all: unset;
}
.cart {
  position: relative;
}
.products-nbr {
  position: absolute;
  background-color: red;
  color: white;
  top: -12px;
  right: -10px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  /* text-align: center; */
}
</style>

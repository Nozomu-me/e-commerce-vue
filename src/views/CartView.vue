<template>
  <div class="container">
    <div class="title">
      <span> My Cart </span>
      <font-awesome-icon :icon="['fas', 'basket-shopping']" />
    </div>
    <hr />
    <div v-for="product of cartProducts">
      <CartProduct
        :product="product"
        @update-cart="updateCart"
        @delete-product="deleteProduct"
      ></CartProduct>
      <hr />
    </div>
    <div class="links">
      <a @click="continueShopping">Continue Shopping</a>
      <a @click="proceedToCheckout">Proceed to checkout</a>
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import CartProduct from '@/components/CartProduct.vue';
export default {
  components: { CartProduct },
  created() {
    if (localStorage.getItem('email') === null)
      this.$router.push({ name: 'home' });
    ecomService
      .getCustomerByEmail(localStorage.getItem('email'))
      .then((res) => {
        this.cartProducts = res.data[0].cart.cartProducts;
      });
  },
  data() {
    return {
      cartProducts: null,
    };
  },
  methods: {
    continueShopping() {
      this.$router.push({ name: 'products' });
    },
    proceedToCheckout() {
      this.$router.push({ name: 'checkout' });
    },
    updateCart({ cartProduct }) {
      this.$store.dispatch('updateCart', {
        email: localStorage.getItem('email'),
        cartProduct,
      });
    },
    deleteProduct(cartProduct) {
      this.$store.dispatch('deleteProduct', {
        email: localStorage.getItem('email'),
        cartProduct,
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
  width: 100%;
}
.links {
  display: flex;
  gap: 20px;
  justify-content: center;
}
a {
  cursor: pointer;
  color: #5d3fd3;
  font-size: 18px;
}
a:hover {
  font-weight: bold;
}
.title {
  display: flex;
  gap: 20px;
  font-size: 40px;
  margin: 10px;
}
</style>

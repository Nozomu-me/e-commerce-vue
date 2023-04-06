<template>
  <div class="container">
    <div class="title">
      <span> My Cart </span>
      <font-awesome-icon :icon="['fas', 'basket-shopping']" />
    </div>
    <hr />
    <div v-show="customer?.cart.cartProducts.length === 0">
      <div class="empty">Your Cart Is Empty :(</div>
      <hr />
    </div>
    <div v-show="customer?.cart.cartProducts.length > 0">
      <div v-for="product of customer?.cart.cartProducts">
        <CartProduct
          :product="product"
          @update-cart="updateCart"
          @delete-product="deleteProduct"
        ></CartProduct>
        <hr />
      </div>
    </div>
    <div class="links-div">
      <p>
        Total: <span>{{ customer?.cart.totalPrice }} $</span>
      </p>
      <div>
        <a @click="continueShopping">Continue Shopping</a>
        <a
          @click="proceedToCheckout"
          v-show="customer?.cart.cartProducts.length > 0"
          >Proceed to checkout</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import CartProduct from '@/components/CartProduct.vue';
import { mapState } from 'vuex';
export default {
  components: { CartProduct },
  created() {
    if (localStorage.getItem('email') === null)
      this.$router.push({ name: 'home' });
    this.$store.dispatch('getCustomerByEmail', {
      email: localStorage.getItem('email'),
    });
  },
  computed: mapState(['customer']),
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
.content {
  display: grid;
  grid-template-columns: 1fr 400px;
}
.links-div {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  gap: 8px;
}
.links-div p {
  font-size: 25px;
}
.links-div p span {
  font-weight: bold;
}
a {
  cursor: pointer;
  color: #5d3fd3;
  font-size: 18px;
  margin: 10px;
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
.empty {
  font-size: 40px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="container">
    <div class="info">
      <p class="title">
        First Name: <span>{{ customer?.firstName }} </span>
      </p>
      <p class="title">
        Last Name: <span>{{ customer?.lastName }} </span>
      </p>
      <p class="title">
        Email: <span> {{ customer?.email }}</span>
      </p>
      <p class="title">
        Phone Number: <span> {{ customer?.phoneNumber }}</span>
      </p>
      <p class="title">
        Shipping Address: <span> {{ customer?.shippingAddress }}</span>
      </p>
      <p class="title">
        Total To Pay: <span> {{ customer?.cart.totalPrice }} </span>$
      </p>
      <button class="btn" @click="confirme">Confirme</button>
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import { mapState } from 'vuex';
export default {
  created() {
    if (localStorage.getItem('email') === null)
      this.$router.push({ name: 'home' });
    this.$store.dispatch('getCustomerByEmail', {
      email: localStorage.getItem('email'),
    });
  },
  computed: mapState(['customer']),
  methods: {
    confirme() {
      console.log('conformed');
      let newCustomer = {
        ...this.customer,
        cart: { cartProducts: [], totalPrice: 0 },
      };
      this.$store.dispatch('updateCustomer', newCustomer);
      this.$router.push({ name: 'thank-you' });
    },
  },
};
</script>

<style scoped>
.container {
  height: 92vh;
  /* padding: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.info {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 90%;
  max-width: 700px;
  padding: 40px;
  gap: 20px;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.title span {
  font-weight: normal;
}
.btn {
  /* all: unset; */
  align-self: center;
  border: none;
  background-color: #5d3fd3;
  padding: 15px 20px;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.7;
  width: 150px;
}
</style>

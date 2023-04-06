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
      <form @submit.prevent="submit">
        <p class="title">Payment Details:</p>
        <div class="payment">
          <InputField
            @change="cardNumber = $event"
            placeholder="Card Number"
          ></InputField>
          <InputField
            @change="cardOwner = $event"
            placeholder="Card Owner Full Name"
          ></InputField>
          <label> Card Exipiration Date </label>
          <InputField
            @change="expiration = $event"
            type="date"
            placeholder="Card Owner Full Name"
          ></InputField>
          <InputField
            @change="shippingAddress = $event"
            placeholder="Shiping address"
          ></InputField>
          <input type="submit" value="Submit" class="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue';
import { mapState } from 'vuex';
export default {
  components: { InputField },
  created() {
    if (localStorage.getItem('email') === null)
      this.$router.push({ name: 'home' });
    this.$store.dispatch('getCustomerByEmail', {
      email: localStorage.getItem('email'),
    });
  },
  computed: mapState(['customer']),
  data() {
    return {
      shippingAddress: '',
      cardNumber: '',
      CardOwner: '',
      expiration: '',
    };
  },
  methods: {
    submit() {
      let newCustomer = {
        ...this.customer,
        shippingAddress: this.shippingAddress,
        payment: {
          cardNumber: this.cardNumber,
          cardOwner: this.cardOwner,
          expiration: this.expiration,
        },
      };
      this.$store.dispatch('updateCustomer', newCustomer);
      this.$router.push({ name: 'order-confirmation' });
    },
  },
};
</script>

<style scoped>
.container {
  height: 92vh;
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
.payment {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
label {
  font-size: 18px;
  font-weight: bold;
  text-align: start;
  margin-left: 5%;
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.submit {
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

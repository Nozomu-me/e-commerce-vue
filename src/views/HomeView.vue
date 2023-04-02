<template>
  <div class="container">
    <div>home {{ customer.firstName }}</div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
export default {
  data() {
    return {
      customer: {},
    };
  },
  created() {
    ecomService
      .getCustomerByEmail(localStorage.getItem('email'))
      .then((res) => {
        this.customer = res.data[0];
      });
  },
};
</script>

<style scoped>
.container {
  padding: 50px;
}
</style>

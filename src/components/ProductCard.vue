<template>
  <div class="product">
    <div class="product-info" @click="onClick">
      <img :src="product.image" class="image" />
      <div class="brand">{{ product.brand }}</div>
      <div class="name">{{ product.name }}</div>
      <div class="category">
        <span>Category: </span>
        {{ product.category }}
      </div>
      <div class="currency">
        {{ product.price }} <span>{{ product.currency }}</span>
      </div>
    </div>
    <Button
      class="btn"
      title="Add to cart"
      @clicked="addToCart"
      v-show="show"
    ></Button>
  </div>
</template>

<script>
import Button from '../components/Button.vue';
import { mapState } from 'vuex';

export default {
  created() {
    if (localStorage.getItem('email') === null) this.show = false;
    else this.show = true;
  },
  props: {
    product: {
      required: true,
    },
  },
  data() {
    return {
      image: this.product.image,
      customer: null,
      show: false,
    };
  },
  components: {
    Button,
  },
  methods: {
    onClick() {
      this.$router.push({
        name: 'product-details',
        params: { id: this.product.id },
      });
    },
    addToCart(event) {
      let { name, brand, price, image } = this.product;
      this.$store.dispatch('addToCart', {
        email: localStorage.getItem('email'),
        cartProduct: { name, brand, price, image, quantity: 1 },
      });
    },
  },
};
</script>

<style scoped>
.brand {
  font-size: 22px;
  font-weight: bold;
  padding-left: 15px;
}
.name {
  font-size: 20px;
  font-weight: 600;
  color: rgb(97, 97, 97);
  padding-left: 15px;
}
.category {
  padding-left: 15px;
}
.category span {
  font-weight: bold;
}
.currency {
  padding-left: 15px;
}
.btn {
  align-self: center;
}
.currency span {
  font-weight: bolder;
  font-size: 18px;
}
.product {
  background-color: white;
  width: 350px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
  font-size: 18px;
  transition: all 0.5s;
  cursor: pointer;
}
.product:hover {
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  scale: 1.03;
}
.product-info {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
}
.image {
  width: 350px;
  height: 350px;
  padding-bottom: 15px;
}
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, 30px);
  gap: 4px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
}
.color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
  -webkit-box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
  -moz-box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
}
</style>

<template>
  <div v-if="loading">Loading</div>
  <div class="container" v-else>
    <h1>{{ product.name }}</h1>
    <hr />
    <div class="details-container">
      <img :src="product.image" class="image" />
      <div class="details">
        <div></div>
        <div class="content">
          <div class="brand">{{ product.brand }}</div>
          <div class="price">
            {{ product.price }} <span>{{ product.priceSign }}</span>
          </div>
          <div class="colors">
            <div
              v-for="color in product.productColors"
              :style="{ backgroundColor: color.value }"
              class="color select-color"
            ></div>
          </div>
          <Button
            v-show="show"
            title="Add to Cart"
            @clicked="addToCart"
          ></Button>
        </div>
      </div>
    </div>
    <hr />
    <div class="colors-container">
      <div v-for="color in product.productColors">
        <div class="cols">
          <div :style="{ backgroundColor: color.value }" class="color"></div>
          <div>{{ color.name }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="description">
      <span>Description: </span>{{ product.description }}
      <div>
        <span>Tags: </span>
        <ul v-for="tag in product.tagList">
          <li>{{ tag }}</li>
        </ul>
      </div>
    </div>
    <hr />
    <div class="reviews">
      <h3>Cusomers reviews</h3>
      <textarea @input="handleChange"></textarea>
      <button @click="submit">Add review</button>
      <div v-for="review in product.reviews">
        <h3>{{ review.customerName }}</h3>
        <p class="rev-content">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import { mapState } from 'vuex';
import Button from '../components/Button.vue';
export default {
  components: {
    Button,
  },
  created() {
    this.$store.dispatch('getProductById', { id: this.$route.params.id });
    if (localStorage.getItem('email') !== null) this.show = true;
  },
  computed: mapState(['product', 'loading', 'customer']),
  methods: {
    addToCart() {
      let { name, brand, price, image } = this.product;
      this.$store.dispatch('addToCart', {
        email: localStorage.getItem('email'),
        cartProduct: { name, brand, price, image, quantity: 1 },
      });
      this.$router.push({ name: 'cart' });
    },
    handleChange(e) {
      this.reviewInput = e.target.value;
    },
    submit() {
      let review = {
        customerName: this.customer.firstName + ' ' + this.customer.lastName,
        content: this.reviewInput,
      };
      this.$store.dispatch('updateProduct', {
        id: this.product.id,
        product: {
          ...this.product,
          reviews: [...this.product.reviews, review],
        },
      });
    },
  },

  data() {
    return {
      show: false,
      reviewInput: '',
    };
  },
};
</script>

<style scoped>
.colors-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  width: 100%;
  gap: 10px;
  padding: 40px;
}
.cols {
  display: flex;
  gap: 10px;
}
.container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 3vw;
  /* font-size: 50px; */
  padding-bottom: 60px;
}
hr {
  align-self: stretch;
}
.image {
  width: 60%;
  max-width: 300px;
  height: 300px;
  position: absolute;
  left: -40px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border-radius: 20px;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
}
.image:hover {
  scale: 1.03;
}
.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-content: center; */
  margin: 15px;
  gap: 30px;
}
.details-container {
  margin-top: 60px;
  margin-bottom: 60px;
  background-color: white;
  width: 90%;
  max-width: 650px;
  min-width: 400px;
  height: 450px;
  position: relative;
}
.colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, 30px);
  gap: 4px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
  -webkit-box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
  -moz-box-shadow: -2px 4px 16px -4px rgba(180, 172, 172, 0.68);
}
.select-color {
  cursor: pointer;
}
.select-color:hover {
  scale: 1.2;
}
.brand {
  font-size: 26px;
  font-weight: bold;
}
.price {
  font-size: 35px;
  font-style: italic;
  color: red;
}
.price span {
  font-weight: bold;
}
.description {
  font-size: 20px;
  text-align: start;
  line-height: 35px;
  padding: 40px;
}
.description span {
  font-weight: 900;
}
.description li {
  margin-left: 40px;
}
.reviews {
  font-size: 20px;
  text-align: start;
  line-height: 35px;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.reviews h3 {
  font-weight: 900;
}
.reviews textarea {
  height: 200px;
  width: 90%;
  max-width: 630px;
  opacity: 0.7;
  padding: 10px;
  font-size: 20px;
}
.reviews button {
  padding: 10px;
  border: none;
  background-color: #5d3fd3;
  opacity: 0.7;
  color: white;
  font-size: 18px;
  width: 150px;
}
.reviews button:hover {
  opacity: 1;
}
.rev-content {
  margin-left: 30px;
}
</style>

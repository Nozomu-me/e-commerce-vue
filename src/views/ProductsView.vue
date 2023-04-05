<template>
  <div class="container">
    <div v-if="loading" class="spinner"><Spinner size="huge" /></div>
    <div class="cards" v-else>
      <div v-for="product in products">
        <ProductCard :product="product" class="card"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import Spinner from 'vue-simple-spinner';
import { mapState } from 'vuex';
export default {
  components: {
    ProductCard,
    Spinner,
  },
  methods: {},
  created() {
    this.$store.dispatch('getProducts');
  },
  computed: {
    ...mapState(['products', 'loading']),
  },
};
</script>

<style scoped>
.spinner {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  padding: 50px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.card {
}
</style>

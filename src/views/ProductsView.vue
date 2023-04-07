<template>
  <div class="container">
    <div class="category" v-if="!loading">
      <div>
        <label for="category">Choose a category:</label>
        <select
          name="category"
          id="category"
          @input="selectCategory"
          :value="value"
        >
          <option value="all">all</option>
          <option value="powder">powder</option>
          <option value="cream">cream</option>
          <option value="pencil">pencil</option>
          <option value="liquid">liquid</option>
          <option value="gel">gel</option>
          <option value="palette">palette</option>
          <option value="concealer">concealer</option>
          <option value="mineral">mineral</option>
          <option value="lipstick">lipstick</option>
          <option value="lip_gloss">lip gloss</option>
          <option value="lip_stain">lip stain</option>
        </select>
      </div>
    </div>
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
  data() {
    return {
      value: 'all',
    };
  },
  components: {
    ProductCard,
    Spinner,
  },
  methods: {
    selectCategory(e) {
      if (e.target.value === 'all') {
        this.value = e.target.value;
        this.$store.dispatch('getProducts');
      } else {
        this.$store.dispatch('filterProducts', {
          key: 'category',
          value: e.target.value,
        });
        this.value = e.target.value;
      }
    },
  },
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
.category {
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: bold;
}
select {
  padding: 10px;
  width: 30%;
  max-width: 300px;
  font-size: 20px;
}
</style>

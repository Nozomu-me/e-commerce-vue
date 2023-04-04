<template>
  <div class="container">
    <!-- hello here -->
    <div><img :src="product.image" /></div>
    <div>
      <div class="name">{{ product.name }}</div>
      <div class="brand">{{ product.brand }}</div>
    </div>
    <div>
      <InputField
        type="number"
        min="1"
        max="100"
        :value="product.quantity"
        @change="updateCart"
        class="input"
      ></InputField>
    </div>
    <div @click="$emit('delete-product', product)">
      <font-awesome-icon icon="fa-solid fa-trash" class="trash-icon" />
    </div>
  </div>
</template>

<script>
import InputField from './InputField.vue';
export default {
  components: { InputField },
  props: ['product'],
  methods: {
    updateCart(e) {
      this.$emit('update-cart', {
        cartProduct: { ...this.product, quantity: +e },
      });
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  width: 100%;
  /* background-color: aqua; */
  justify-content: space-between;
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr 100px; */
}
.input {
  width: 150px;
}
img {
  width: 250px;
  height: 250px;
}
.trash-icon {
  color: red;
  font-size: 30px;
  cursor: pointer;
}
.name {
  font-size: 20px;
  font-weight: bold;
}
.brand {
  font-size: 20px;
}
@media (max-width: 800px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }
}
</style>

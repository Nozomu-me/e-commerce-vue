<template>
  <div class="container">
    <div><img :src="product.image" /></div>
    <div>
      <div class="name">{{ product.name }}</div>
      <div class="brand">{{ product.brand }}</div>
    </div>
    <div class="qty">
      <span> Quantity: </span>
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
  justify-content: space-between;
  align-items: center;
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
.qty {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  font-weight: bold;
}
@media (max-width: 800px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }
}
</style>

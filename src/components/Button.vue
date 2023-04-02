<template>
  <button>{{ title }}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
button {
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
button:hover {
  opacity: 1;
}
</style>

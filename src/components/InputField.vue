<template>
  <div>
    <input
      :placeholder="placeholder"
      @input="(e) => $emit('message', e.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ['placeholder'],
  data() {
    return {
      //   show,
      //   user: this.createUser(),
      input: '',
    };
  },
};
</script>

<style scoped>
input {
  width: 90%;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;
  border-width: 1px;
  outline: none;
}
</style>

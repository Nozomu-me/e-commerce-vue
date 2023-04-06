<template>
  <div>
    <input
      :placeholder="placeholder"
      @input="(e) => $emit('change', e.target.value)"
      :type="type"
      :min="min"
      :max="max"
      :value="value"
      required
    />
  </div>
</template>

<script>
export default {
  props: ['placeholder', 'type', 'min', 'max', 'value'],
  data() {
    return {
      input: '',
    };
  },
};
</script>

<style scoped>
input {
  width: 90%;
  padding: 15px;
  font-size: 20px;
  border-radius: 10px;
  border-width: 1px;
  outline: none;
}
</style>

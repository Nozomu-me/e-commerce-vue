<template>
  <div class="footer">
    <hr />
    <div>Copyright, {{ date }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
}
hr {
  align-self: stretch;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="container">
    <div class="logout" @click="logout">
      Logout
      <font-awesome-icon
        :icon="['fasr', 'right-from-bracket']"
        class="logout-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('email');
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
}
.logout {
  position: fixed;
  top: 60px;
  right: 100px;
  padding: 20px;
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  cursor: pointer;
  background-color: white;
  z-index: 2000;
}
.logout-icon {
  color: red;
}
</style>

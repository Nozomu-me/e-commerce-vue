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
/* .logout {
  position: fixed;
  width: 600px;
  height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 20000;
  background-color: aqua;
} */
/* .logout {
  position: fixed;
  background-color: white;
  z-index: 100000000000000000;
  right: 100px;
  padding: 20px;
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  cursor: pointer;
}*/
.logout-icon {
  color: red;
}
</style>

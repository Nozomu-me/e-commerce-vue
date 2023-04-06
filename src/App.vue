<template>
  <div id="app">
    <Navbar @show="handleShow" class="nav" :loged="loged"> </Navbar>
    <div v-show="show">
      <Modal class="app-modal" @show="handleShow" v-show="showModal"></Modal>
      <Logout v-show="showLogout"></Logout>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Modal from './components/Modal.vue';
import Logout from './components/Logout.vue';

export default {
  components: {
    Navbar,
    Modal,
    Logout,
  },
  mounted() {
    if (localStorage.getItem('email') === null) {
      this.showModal = true;
      this.showLogout = false;
      this.loged = false;
    } else {
      this.showLogout = true;
      this.showModal = false;
      this.loged = true;
    }
  },
  data() {
    return {
      show: false,
      showModal: true,
      showLogout: false,
      loged: false,
    };
  },
  methods: {
    handleShow(s) {
      this.show = s;
    },
    handleClick() {
      this.show = false;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #e6e6fa;
  margin-top: 60px;
  position: relative;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Courier New', Courier, monospace;
}
</style>

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
    console.log('mounted ', localStorage.getItem('email'));
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
      console.log('hande');
      console.log(s);
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
  /* position: relative; */
  position: relative;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Courier New', Courier, monospace;
  /* background-color: red; */
  /* height: 100vh; */
}
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
}
.logout-icon {
  color: red;
} */
/* .app-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 20000;
} */
.nav {
  /* position: fixed;
  left: 0;
  right: 0; */
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

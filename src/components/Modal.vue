<template>
  <div class="container">
    <div class="overlay" @click="close"></div>
    <div class="modal">
      <button class="close-btn" @click="close">&times;</button>
      <form action="" @submit.prevent="submit">
        <InputField placeholder="Email" @message="email = $event"></InputField>
        <small v-show="show">This user does not exist</small>
        <input type="submit" class="btn" value="Login" />
      </form>
      <a @click="handleClick">Register</a>
    </div>
  </div>
</template>

<script>
import InputField from '../components/InputField.vue';
import Button from '../components/Button.vue';
import ecomService from '@/services/ecomService';
export default {
  components: {
    InputField,
    Button,
  },
  data() {
    return {
      email: '',
      show: false,
    };
  },
  methods: {
    close() {
      this.$emit('show', false);
    },
    handleClick() {
      this.$emit('show', false);
      this.$router.push({ name: 'register' });
    },
    submit() {
      ecomService.getCustomerByEmail(this.email).then((res) => {
        console.log(res.data);
        if (res.data.length) {
          this.show = false;
          localStorage.setItem('email', this.email);
          this.$router.go(0);
        } else {
          this.show = true;
        }
      });
    },
  },
};
</script>

<style scoped>
small {
  color: red;
}
.container {
  position: relative;
}
.overlay {
  background-color: gray;
  opacity: 0.5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
.modal {
  border-radius: 10px;
  background-color: white;
  width: 600px;
  height: 300px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding-top: 140px;
  /* padding-bottom: 70px; */
  z-index: 200;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  /* align-items: center; */
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
}
.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: red;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
}
a {
  cursor: pointer;
  display: block;
  padding-bottom: 70px;
}
a:hover {
  color: #5d3fd3;
}
.btn {
  align-self: center;
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
.btn:hover {
  opacity: 1;
}
</style>

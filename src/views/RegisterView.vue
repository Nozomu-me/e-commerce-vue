<template>
  <div class="container">
    <div class="image">
      <img
        src="https://www.hcpc-uk.org/globalassets/image-library/icons/icon-register-800x600.gif"
      />
    </div>
    <div class="form-div">
      <form @submit.prevent="submit">
        <InputField
          class="input"
          placeholder="First Name"
          @change="user.firstName = $event"
        ></InputField>
        <InputField
          class="input"
          placeholder="Last Name"
          @change="user.lastName = $event"
        ></InputField>
        <InputField
          class="input"
          placeholder="Email"
          @change="user.email = $event"
          type="email"
        ></InputField>
        <small v-show="errorEmail">This email is already used</small>
        <InputField
          class="input"
          placeholder="Password"
          @change="user.password = $event"
          type="password"
        ></InputField>
        <InputField
          class="input"
          placeholder="Phone Number"
          @change="user.phoneNumber = $event"
        ></InputField>
        <input type="submit" class="btn" value="Register" />
      </form>
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import { mapState } from 'vuex';
import InputField from '../components/InputField.vue';
export default {
  created() {
    if (localStorage.getItem('email') !== null)
      this.$router.push({ name: 'home' });
  },
  data() {
    return {
      user: this.createUser(),
      errorEmail: false,
      customers: [],
    };
  },
  components: {
    InputField,
  },
  computed: mapState({
    customer: (state) => state.customer,
  }),
  methods: {
    createUser() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      };
    },
    async submit() {
      let res = await ecomService.getCustomers();
      this.customers = res.data;
      for (let cus of this.customers) {
        if (cus.email === this.user.email) this.errorEmail = true;
        else this.errorEmail = false;
      }
      if (this.errorEmail === false) {
        this.$store.dispatch('registerCustomer', this.user);
      }
    },
  },
};
</script>

<style scoped>
small {
  color: red;
}
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
}
.image {
  width: 50%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.form-div {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100%;
}
.input {
  width: 100%;
  max-width: 600px;
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

@media (max-width: 800px) {
  .container {
    flex-direction: column;
  }
  .image {
    width: 100%;
    height: 50%;
  }
  .form-div {
    width: 100%;
    height: 50%;
  }
}
</style>

<template>
  <div>
    <button @click="handleClick">
      <span v-if="!loading">
        {{ title }}
      </span>
      <span v-else class="loader"> </span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    handleClick(e) {
      this.$emit('clicked', e.target.value);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: mapState(['cartAddLoading']),
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
.loader {
  width: 20px;
  height: 20px;
  border: 5px solid #fff;
  border-bottom-color: #5d3fd3;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

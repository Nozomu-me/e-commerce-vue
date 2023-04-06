<template>
  <div>
    <div v-if="loading" class="spinner"><Spinner size="huge" /></div>
    <div class="container" v-else>
      <div class="home">
        <div class="about-us">
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aut
            voluptate consequuntur in corrupti, numquam, saepe dicta enim nam
            asperiores cumque quibusdam alias placeat inventore ipsum molestias
            itaque. Eum, cupiditate.
          </p>
        </div>
        <div></div>
      </div>
      <div class="content">
        <h1 class="title">Featured Products:</h1>
        <div class="grid">
          <div v-for="item in featured">
            <div class="item" @click="() => handleClick(item)">
              <img :src="item.image_link" />
              <p class="item-name">{{ item.name }}</p>
              <p>{{ item.brand }}</p>
            </div>
          </div>
        </div>
        <h1 class="title">Categories</h1>
        <h1 class="category-title">Lipsticks :</h1>
        <div class="grid">
          <div v-for="item in lipsticks">
            <div class="item" @click="() => handleClick(item)">
              <img :src="item.image_link" />
              <p class="item-name">{{ item.name }}</p>
              <p>{{ item.brand }}</p>
            </div>
          </div>
        </div>
        <h1 class="category-title">Powder :</h1>
        <div class="grid">
          <div v-for="item in powder">
            <div class="item" @click="() => handleClick(item)">
              <img :src="item.image_link" />
              <p class="item-name">{{ item.name }}</p>
              <p>{{ item.brand }}</p>
            </div>
          </div>
        </div>
        <h1 class="category-title">Liquid :</h1>
        <div class="grid">
          <div v-for="item in liquid">
            <div class="item" @click="() => handleClick(item)">
              <img :src="item.image_link" />
              <p class="item-name">{{ item.name }}</p>
              <p>{{ item.brand }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import { mapState } from 'vuex';
import Spinner from 'vue-simple-spinner';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      lipsticks: [],
      powder: [],
      liquid: [],
      featured: [],
      loading: false,
    };
  },
  computed: mapState(['customer']),
  created() {
    if (localStorage.getItem('email') !== null) {
      this.$store.dispatch('getCustomerByEmail', {
        email: localStorage.getItem('email'),
      });
    }
    this.loading = true;
    const random = Math.floor(Math.random() * 100);
    ecomService.getProductsLimit(random, random + 4).then((res) => {
      this.featured = res.data;
      ecomService.getCategory('lipstick', 4).then((res) => {
        this.lipsticks = res.data;
        ecomService.getCategory('powder', 4).then((res) => {
          this.powder = res.data;
          ecomService
            .getCategory('liquid', 4)
            .then((res) => {
              this.liquid = res.data;
            })
            .finally(() => (this.loading = false));
        });
      });
    });
  },
  methods: {
    handleClick(item) {
      this.$router.push({
        name: 'product-details',
        params: { id: item.id },
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 100%;
}
.home {
  width: 100%;
  height: 700px;
  background-image: url('https://burst.shopifycdn.com/photos/makeup-beauty-flatlay.jpg?width=1200&format=pjpg&exif=1&iptc=1');
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  padding: 60px;
}
.spinner {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 100%;
}
.about-us {
  font-size: 24px;
}
.about-us p {
  color: white;
  font-weight: bold;
  margin-top: 20px;
}
.title {
  text-align: start;
  margin-left: 10%;
}

.grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 80px;
  justify-content: center;
  align-items: center;
}
img {
  width: 250px;
  height: 300px;
}
.item {
  height: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  cursor: pointer;
  transition: all 0.5s;
}
.item:hover {
  transform: scale(1.06);
}
.title {
  text-align: center;
  margin: 30px;
}
.category-title {
  text-align: start;
  margin: 40px;
  margin-left: 10%;
}
.item-name {
  font-size: 20px;
  font-weight: bold;
}
</style>

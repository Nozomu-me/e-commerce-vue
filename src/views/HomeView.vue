<template>
  <div class="container">
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
      <!-- <div class="featured"> -->
      <div class="grid">
        <div v-for="item in featured">
          <div class="item" @click="() => handleClick(item)">
            <img :src="item.image_link" />
            <p class="item-name">{{ item.name }}</p>
            <p>{{ item.brand }}</p>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <h1 class="title">Categories</h1>
      <!-- <div class="lipsticks"> -->
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
      <!-- </div> -->
      <!-- <div class="powder"> -->
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
      <!-- </div> -->
      <!-- <div class="liquid"> -->
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ecomService from '@/services/ecomService';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      lipsticks: [],
      powder: [],
      liquid: [],
      featured: [],
    };
  },
  computed: mapState(['customer']),
  created() {
    if (localStorage.getItem('email') !== null) {
      this.$store.dispatch('getCustomerByEmail', {
        email: localStorage.getItem('email'),
      });
    }
    const random = Math.floor(Math.random() * 100);
    ecomService.getProductsLimit(random, random + 4).then((res) => {
      this.featured = res.data;
    });
    ecomService.getCategory('lipstick', 4).then((res) => {
      this.lipsticks = res.data;
    });
    ecomService.getCategory('powder', 4).then((res) => {
      this.powder = res.data;
    });
    ecomService.getCategory('liquid', 4).then((res) => {
      this.liquid = res.data;
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
  background-color: aqua;
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
.content {
  background-color: blueviolet;
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
  background-color: bisque;
  grid-template-columns: repeat(auto-fit, 350px);
  gap: 80px;
  justify-content: center;
  align-items: center;
}
img {
  width: 300px;
  height: 300px;
}
.item {
  /* width: 350px; */
  height: 450px;
  padding: 20px;
  background-color: white;
  box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -webkit-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 3px 3px 34px -2px rgba(0, 0, 0, 0.41);
  cursor: pointer;
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

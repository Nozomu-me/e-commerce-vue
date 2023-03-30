import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderConfirmationView from '../views/OrderConfirmationView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import ProductsView from '../views/ProductsView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView
  },
  {
    path: '/order-confirmation',
    name: 'order-confirmation',
    component: OrderConfirmationView
  },
  {
    path: '/product-details/:id',
    name: 'product-details',
    component: ProductDetailsView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import AllProducts from './pages/AllProducts.vue';
import ProductDetails from './pages/ProductDetails.vue';
import AddProduct from './pages/AddProduct.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: AllProducts },
    // get the route param using props: true
    // see the ProductDetails page
    { path: '/products/:pid', component: ProductDetails, props: true },
    { path: '/products/add', component: AddProduct },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

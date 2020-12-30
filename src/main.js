import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import TrafficLights from "./components/TrafficLights";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const delays = [10, 3, 15];
const routes = [
  {
    path: '/red',
    name: 'red',
    component: TrafficLights,
    props: {
      mask: '100',
      delay: delays[0],
      next: ['/yellow'],
    }},
  {
    path: '/yellow',
    name: 'yellow',
    component: TrafficLights,
    props: {
      mask: '010',
      delay: delays[1],
      next: ['/green', '/red'],
    }},
  {
    path: '/green',
    name: 'green',
    component: TrafficLights,
    props: {
      mask: '001',
      delay: delays[2],
      next: ['/yellow']
    }},
  {
    path: '/',
    redirect: '/red'
  },
];

const router = new VueRouter({routes});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

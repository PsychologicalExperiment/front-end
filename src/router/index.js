import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../components/login/loginPage.vue";
import HomePage from '../components/homePage/homePage.vue'
import {
  ROUTE_NAME_HOME,
  ROUTE_NAME_LOGIN,
} from '../constants/global'

const routes = [
  {
    path: '/login',
    name: ROUTE_NAME_LOGIN,
    component: LoginPage,
  },
  {
    path: '/',
    name: ROUTE_NAME_HOME,
    component: HomePage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
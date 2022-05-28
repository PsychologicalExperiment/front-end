import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../components/login/loginPage.vue";
import HomePage from '../components/homePage/homePage.vue'
import RegisterPage from '../components/register/registerPage.vue'

import {
  ROUTE_NAME_HOME,
  ROUTE_NAME_LOGIN,
  ROUTE_NAME_REGISTER,
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
  },
  {
    path: '/register',
    name: ROUTE_NAME_REGISTER,
    component: RegisterPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
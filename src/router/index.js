import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "../components/login/loginPage.vue"
import HomePage from '../components/homePage/homePage.vue'
import NewStudyPage from '../components/newStudy/newStudyPage.vue'
import RunningStudyPage from '../components/studyPage/studyPage.vue'
import {
  ROUTE_NAME_HOME,
  ROUTE_NAME_LOGIN,
  ROUTER_NAME_NEW_STUDY,
  ROUTER_NAME_NEW_RUNNING,
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
    path: '/new-study',
    name: ROUTER_NAME_NEW_STUDY,
    component: NewStudyPage,
  },
  {
    path: "/study-running",
    name: ROUTER_NAME_NEW_RUNNING,
    component: RunningStudyPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
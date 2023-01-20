import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from "../components/login/loginPage.vue"
import HomePage from '../components/homePage/homePage.vue'
import NewStudyPage from '../components/newStudy/newStudyPage.vue'
import RunningStudyPage from '../components/studyPage/studyPage.vue'
import StudyDetailPage from '../components/studyPage/studyDetails.vue'
import RegisterPage from '../components/register/registerPage.vue'
import ManageMentPage from '../components/management/managerPage.vue'
import {
  ROUTE_NAME_HOME,
  ROUTE_NAME_LOGIN,
  ROUTER_NAME_NEW_STUDY,
  ROUTER_NAME_NEW_RUNNING,
  ROUTE_NAME_REGISTER,
  ROUTE_NAME_STUDY_DETAIL,
  ROUTE_NAME_STUDY_MANAGEMENT,
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
  },
  {
    path: '/register',
    name: ROUTE_NAME_REGISTER,
    component: RegisterPage,
  },
  {
    path: '/study-details/:id',
    name: ROUTE_NAME_STUDY_DETAIL,
    component: StudyDetailPage,
  },
  {
    path: '/study-management/:id',
    name: ROUTE_NAME_STUDY_MANAGEMENT,
    component: ManageMentPage,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
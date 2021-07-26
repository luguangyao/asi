import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Flight from '../views/Flight'
import Hotel from "../views/Hotel"
import FlightDetail from "../views/FlightDetail"
import Personal from "../views/Personal"
import Login from "../views/Login"
import UserInfo from "@/components/function/UserInfo"
import Pay from "../views/Pay"

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/personal',
    name:'Personal',
    component:Personal,
    children:[
      {
        path:'userinfo/:selected',
        name:'UserInfo',
        component:UserInfo,
        props:true
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/other',
    component: () => import(/* webpackChunkName: "about" */ '../views/Other.vue'),
    children:[
      {
        path:'flight',
        name: 'Flight',
        component: Flight
      },
      {
        path:'flightdetail',
        name: 'FlightDetail',
        component: FlightDetail
      },
      {
        path:'hotel',
        name: 'Hotel',
        component: Hotel
      },
    ]
  },
  {
    path:'/pay',
    name:'Pay',
    component:Pay,
  },
  {
    path:'/*',
    redirect:'Home'
  }
]

const router = new VueRouter({
  routes,
  mode:"history"

})

export default router

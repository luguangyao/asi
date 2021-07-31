import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Flight from '../views/Flight'
import Hotel from "../views/Hotel"
import FlightDetail from "../views/FlightDetail"
import Personal from "../views/Personal"
import Login from "../views/Login"
import UserInfo from "@/components/function/UserInfo"
import Empty from "@/components/function/Empty"
import Pay from "../views/Pay"
import AdminFlightService from "@/components/function/AdminFlightService"
import DataVisable from "../components/datavisable/DataVisable"
import AdminOrdersService from "@/components/AdminOrders/AdminOrdersService"
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/personal',
    name:'personal',
    component:Personal,
    children:[
      {
        path:'userinfo/:selected',
        name:'userinfo',
        component:UserInfo,
        props:true
      },
      {
        path:'adminflightservice',
        name:'adminflightservice',
        component:AdminFlightService
      },
      {
        path:"adminordersservice",
        name:"adminordersservice",
        component:AdminOrdersService
      },
      {
        path:'datavisiable',
        name:'datavisiable',
        component:DataVisable
      },
      {
        path:'empty',
        name:"empty",
        component:Empty
      },
      {
        path:'/personal/*',
        redirect:'empty'
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path: '/other',
    component: () => import(/* webpackChunkName: "about" */ '../views/Other.vue'),
    children:[
      {
        path:'flight',
        name: 'flight',
        component: Flight
      },
      {
        path:'flightdetail',
        name: 'flightdetail',
        component: FlightDetail
      },
      {
        path:'hotel',
        name: 'hotel',
        component: Hotel
      },
    ]
  },
  {
    path:'/pay',
    name:'pay',
    component:Pay,
  },
  {
    path:'/*',
    redirect:'home'
  }
]

const router = new VueRouter({
  routes,
  mode:"history"

})

export default router

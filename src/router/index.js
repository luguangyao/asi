import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Flight from '../views/Flight'
import Hotel from "../views/Hotel"
import FlightDetail from "../views/FlightDetail"
import Personal from "../views/Personal"
import FAQ from "../views/FAQ"
import Login from "../views/Login"
import UserInfo from "@/components/function/UserInfo"
import Empty from "@/components/function/Empty"
import Pay from "../views/Pay"
import AdminFlightService from "@/components/function/AdminFlightService"
import DataVisable from "../components/datavisable/DataVisable"
import AdminOrdersService from "@/components/AdminOrders/AdminOrdersService"
import UserOrders from "@/components/userOrders/UserOrders"

Vue.use(VueRouter)

import { message } from 'ant-design-vue'

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
        name:'AdminFlightService',
        component:AdminFlightService
      },
      {
        path:"adminordersservice",
        name:"AdminOrdersService",
        component:AdminOrdersService
      },
      {
        path:'datavisiable',
        name:'datavisiable',
        component:DataVisable
      },
      {
        path:'userorders/:page',
        name:'UserOrders',
        component:UserOrders,
        props:true
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
      {
        path:'faq',
        name:"faq",
        component:FAQ
      }
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
router.beforeEach((to, from, next) => {
  if(to.name=="hotel"){
    message.error("酒店功能正在开发!!")
    return
  }
  // if(to.path.match(/^\/personal.*/)!=null&&sessionStorage.getItem("isLogin")!="true"){
  //   message.error("登录后才能进入个人页面!!")
  //   return
  // }
  next()
})


//防止路由重入时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router

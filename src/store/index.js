import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loginData:{
      isLogin:false,
      loginType:1
    },
    userOrdersPage:"0",
    locationMessage:undefined,
    lang:"zh-CN",
    personalMenuList:[
      {
        name: "user",
        icon: "user",
        url:"/userInfo",
        urlname:"UserInfo",
        display: "m.user",
        children: [
          {
            name: "user message",
            url:"/user message",
            display:"m.userMessage",
          },
          {
            name: "account message",
            url:"/account message",
            display: "m.accountMessage",
          },
          {
            name: "useful message",
            url:"/useful message",
            display: "m.usefulMessage",
          },
        ],
      },
      {
        name: "orders message",
        icon: "shopping-cart",
        url:"/UserOrders",
        urlname:"UserInfo",
        display:"m.ordersMessage",
        children: [
          {
            name: "all orders",
            url:"/1",
            display: "m.allOrders",
          },
          {
            name: "paid orders",
            url:"/2",
            display: "m.paidOrders",
          },
          {
            name: "unpaid orders",
            url:"/3",
            display: "m.unpaidOrders",
          },
          {
            name: "comfirmed orders",
            url:"/4",
            display: "m.comfirmedOrders",
          },
          {
            name: "canceled orders",
            url:"/5",
            display: "m.canceledOrders",
          },
        ],
      },
      {
        name: "manager",
        icon: "dot-chart",
        url:"",
        urlname:"UserInfo",
        display: "m.manager",
        children: [
          {
            name: "data graph",
            url:"/datavisiable",
            display:"m.dataGraph",
          },
          {
            name: "order service",
            url:"/AdminOrdersService",
            display:"m.orderService",
          },
          {
            name: "flight service",
            url:"/AdminFlightService",
            display: "m.flightService",
          },
        ],
      },
    ],
  },
  mutations: {
    setLoginData(state,isLogin){
      state.loginData.isLogin=isLogin
    },
    setLoginType(state,loginType){
      state.loginData.loginType=loginType
    },
    setUserOrdersPage(state,page){
      state.userOrdersPage=page
    },
    setLocation(state,locationMessage){
      state.locationMessage=locationMessage
    },
    switchLanguage(state,that){
      state.lang=(state.lang=="zh-CN"?"en-US":"zh-CN")
      that.$i18n.locale=state.lang
    },
    switchGotoPay(state,st){
      this.gotoPay=st
    },
    checkGotoPay(){
      return this.gotoPay
    }
  },
  getters: {
    checkGotoPay: state => {
      return state.gotoPay
    }
  },
  actions: {
  },
  modules: {
  }
})

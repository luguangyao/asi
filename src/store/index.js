import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loginData:{
      isLogin:false,
      loginType:1
    },
    locationMessage:undefined,
    lang:"zh-CN",
    personalMenuList:[
      {
        name: "user",
        icon: "user",
        url:"/userInfo",
        urlname:"UserInfo",
        display: ()=>this.$t("m.user"),
        children: [
          {
            name: "user message",
            url:"/user message",
            display: () => this.$t("m.userMessage"),
          },
          {
            name: "account message",
            url:"/account message",
            display: () => this.$t("m.accountMessage"),
          },
          {
            name: "useful message",
            url:"/useful message",
            display: () => this.$t("m.usefulMessage"),
          },
        ],
      },
      {
        name: "orders message",
        icon: "shopping-cart",
        url:"/userInfo",
        urlname:"UserInfo",
        display: () => this.$t("m.ordersMessage"),
        children: [
          {
            name: "all orders",
            url:"/useful message",
            display: () => this.$t("m.allOrders"),
          },
          {
            name: "waiting orders",
            url:"/useful message",
            display: () => this.$t("m.waitingOrders"),
          },
          {
            name: "unpaid orders",
            url:"/useful message",
            display: () => this.$t("m.unpaidOrders"),
          },
          {
            name: "canceled orders",
            url:"/useful message",
            display: () => this.$t("m.canceledOrders"),
          },
        ],
      },
      {
        name: "manager",
        icon: "dot-chart",
        url:"",
        urlname:"UserInfo",
        display: () => this.$t("m.manager"),
        children: [
          {
            name: "data graph",
            url:"/datavisiable",
            display: () => this.$t("m.dataGraph"),
          },
          {
            name: "order service",
            url:"/AdminOrdersService",
            display: () => this.$t("m.orderService"),
          },
          {
            name: "flight service",
            url:"/AdminFlightService",
            display: () => this.$t("m.flightService"),
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
      console.log("checkGotoPay")
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

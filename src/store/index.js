import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
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
            display: () => this.$t("m.userMessage"),
          },
          {
            name: "account message",
            display: () => this.$t("m.accountMessage"),
          },
          {
            name: "useful message",
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
            display: () => this.$t("m.allOrders"),
          },
          {
            name: "waiting orders",
            display: () => this.$t("m.waitingOrders"),
          },
          {
            name: "unpaid orders",
            display: () => this.$t("m.unpaidOrders"),
          },
          {
            name: "canceled orders",
            display: () => this.$t("m.canceledOrders"),
          },
        ],
      },
      {
        name: "manager",
        icon: "dot-chart",
        url:"/userInfo",
        urlname:"UserInfo",
        display: () => this.$t("m.manager"),
        children: [
          {
            name: "data graph",
            display: () => this.$t("m.dataGraph"),
          },
          {
            name: "order service",
            display: () => this.$t("m.orderService"),
          },
          {
            name: "flight service",
            display: () => this.$t("m.flightService"),
          },
        ],
      },
    ],
  },
  mutations: {
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

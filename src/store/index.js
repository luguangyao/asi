import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang:"zh-CN"
  },
  mutations: {
    switchLanguage(state,that){
      state.lang=(state.lang=="zh-CN"?"en-US":"zh-CN")
      that.$i18n.locale=state.lang
    }
  },
  actions: {
  },
  modules: {
  }
})

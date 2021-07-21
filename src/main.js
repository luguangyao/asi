import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import { Button,PageHeader,Descriptions,Menu,Icon  } from 'ant-design-vue';

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(PageHeader.name,PageHeader)
Vue.component(Descriptions.name,Descriptions)
Vue.component(Icon.name,Icon)

Vue.component(Menu.name,Menu )
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('../common/lang/zh'),   // 中文语言包
      'en-US': require('../common/lang/en')    // 英文语言包
    }
})

export default i18n
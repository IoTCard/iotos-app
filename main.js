import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission
import messages from './locale/index'
import VueI18n from 'vue-i18n'
let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)


// 引入全局 uview 框架
import uView from 'uni_modules/uview-ui'
Vue.use(uView)




Vue.use(plugins)

Vue.config.productionTip = false
Vue.prototype.$store = store


App.mpType = 'app'

const app = new Vue({
	i18n,
  ...App
})

app.$mount()

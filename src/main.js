import Vue from 'vue'
import { Button, Form, FormItem, Checkbox, Input, Card } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
// import metrika from 'KitPlugins/vue-yandex-metrika'
import Styles from 'Styles/index.scss'
// import KitComponents from 'KitComponents/common'
import KitPlugins from 'KitPlugins/common'
// import VueScrollTo from 'vue-scrollto'
import App from './layout/Index.vue'

// common
// Vue.use(KitComponents)
Vue.use(Styles)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(KitPlugins)

Vue.prototype.$ELEMENT = { locale, size: 'medium' }
Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
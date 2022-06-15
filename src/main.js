import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'

// 第一个参数：全局组件的名字；第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

//  ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入MockServe.js ---- mock数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 统一接口api文件夹里面全部请求函数
import * as API from '@/api'

// 引入插件图片懒加载
import VueLazyload from 'vue-lazyload'
import icons from '@/assets/images/icons.png'

// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: icons,
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper',
})

// 引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // $router:进行编程式导航路由跳转push||replace
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')

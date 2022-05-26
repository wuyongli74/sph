// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

/**
 * 重写push | replace
 *    第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
 *    第二个参数：成功的回调
 *    第三个参数：失败的回调
 *
 * call || apply区别
 *   相同点：都可以调用函数一次，都可以篡改函数的上下文一次
 *   不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
 */
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

export default new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  },
  mode: 'history',
})

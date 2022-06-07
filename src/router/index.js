// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
// 使用插件
Vue.use(VueRouter)

// 引入store
import store from '@/store'

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

// 对外暴露VueRouter类的实例
let router = new VueRouter({
  /**
   * 配置路由
   * 第一：路径的前面需要有斜杠'/'(不是二级路由)
   * 路由中单词都是小写的
   * component右侧别加单引号【字符串：组件是对象（VueComponent类的实例）】
   */
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  },
  mode: 'history',
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  /**
   * to：可以获取到你要跳转到哪个路由信息
   * from：可以获取到你从哪个路由而来的信息
   * next：放行函数
   * next('/home') 放行到哪个指定位置  next(path)放行到指定路由
   */
  // next()
  // 用户登录了，才会有token，未登录一定不会有token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.name
  console.log(name)
  // 用户已近登录了
  if (token) {
    // 用户已近登录了还想去login【不能去，停留在首页】
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      // 登录了，但是去的不是login和register【home|search|detail|shopcart】
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 登录了且没有用户信息 派发action让仓库存储用户信息在跳转
        // 在路由跳转之前获取用户信息且放行
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          // 放行
          next()
        } catch (error) {
          // token失效了获取不到用户信息，重新登录
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录暂时没有处理完毕，后期再处理
    next()
  }
})

export default router

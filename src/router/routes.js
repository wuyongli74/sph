// 引入路由组件 ---- 下方使用路由懒加载
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

// 路由配置信息
export default [
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    // 二级路由组件
    children: [
      { path: 'myorder', component: myOrder },
      {
        path: 'grouporder',
        component: groupOrder,
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    },
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path == '/shopcart') {
        next()
      } else {
        // 其他的路由组件而来，停留在当前
        next(false)
      }
    },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true },
  },
  {
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true },
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { show: true },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false },
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: 'search',
    // 路由组件能不能传递props数据？
    // 1、布尔值写法：params
    // props: true,
    // 2、对象写法：额外的给路由组件传递一些props
    // props: { a: 1, b: 2 },
    // 3、函数写法：可以params参数、query参数，通过props传递给路由组件
    props: $route => ({ keyword: $route.params.keyword, k: $route.query.k }),
  },
  // 重定向
  {
    path: '',
    redirect: '/home',
  },
]

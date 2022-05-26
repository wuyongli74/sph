// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

// 路由配置信息
export default [
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true },
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true },
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false },
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false },
  },
  {
    path: '/search/:keyword?',
    component: Search,
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

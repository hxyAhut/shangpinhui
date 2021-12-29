import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入路由组件
import Homepage from '@/views/Home'
import Searchpage from '@/views/Search'
import Loginpage from '@/views/Login'
import Registerpage from '@/views/Register'
import Detailpage from '@/views/Detail'
import Addcartsuccesspage from '@/views/AddCartSuccess'
import Shopcartpage from '@/views/ShopCart'
import Tradepage from '@/views/Trade'
import Paypage from '@/views/Pay'
import Paysuccess from '@/views/PaySuccess'
import Centerpage from '@/views/Center'

// 引入子路由
import Myorder from '@/views/Center/myOrder';
import Grouporder from '@/views/Center/groupOrder';

// 引入仓库
import store from '@/store'

const routes = [
  {
    path: '/home',
    component: Homepage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/center',
    component: Centerpage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    },
    // 子路由
    children: [
      {
        path: 'myorder',
        component: Myorder
      },
      {
        path: 'grouporder',
        component: Grouporder
      },
      {
        redirect: 'myorder',
        path: '/'
      }
    ]
  },
  {
    path: '/paysuccess',
    component: Paysuccess,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/pay',
    component: Paypage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/trade',
    component: Tradepage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/cart/cartList',
    name: 'shopcart',
    component: Shopcartpage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: Addcartsuccesspage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    path: '/detail/:skuid',
    component: Detailpage,
    // 通过设置路由元信息来配置dom的显示与隐藏
    meta: {
      show: true
    }
  },
  {
    name: '/search',
    path: '/search/:keyword?',
    component: Searchpage,
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    component: Loginpage,
    meta: {
      show: false
    }
  },
  {
    path: '/register',
    component: Registerpage,
    meta: {
      show: false
    }
  },
  {
    // 重定向
    path: '/',
    redirect: '/home',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 路由的滚动行为：修改其滚动位置，使其加载完毕即在顶部
  scrollBehavior (to, from, savedPosition) {
    return {y: 0}
  }
})

let token = store.state.registerAndLogin.token;

// 全局路由守卫，可监听所有路由跳转
// 路由前置守卫：beforeEach,可在路由跳转前做一些事情
router.beforeEach(async (to, from, next) => {
  // to:代表要跳转的路由对象   from:代表当前路由对象，即从哪儿来的路由对象   next：放行函数
  // 用户已登录
  if(token) {
    // 如果用户已经登录，就不能再跳转到/login页
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    }else {
      // 如果不是登录页面，则放行。且需要重新获取用户信息
      next();
      try {
        // 获取用户信息
        await store.dispatch('userInfo');
      } catch (error) {
        // 获取用户信息失败，此时token失效，需要清除token,然后跳转到/login页面
        await store.dispatch('userLoginOut');
        next('/login')
      }
    }
  }else {
    // 用户未登录
    // 未登录时，只有home/search/shopCart能访问，其它路由不能访问
    
    next();
  }
  
})


export default router

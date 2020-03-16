import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }




 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',

    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '主页', icon: 'home' }
    }]
  },

  {
    path: '/account',
    component: Layout,
    name: 'account',
    meta: { title: '子账号管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/account/index'),
        meta: { title: '子账号管理'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/account/role'),
        meta: { title: '角色管理'}
      }
    ]
  },

  {
    path: '/sale',
    component: Layout,
    name: 'sale',
    meta: { title: '销售管理', icon: 'list' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/sale/index'),
        meta: { title: '销售管理'}
      },
      {
        path: 'fpwx',
        name: 'fpwx',
        component: () => import('@/views/sale/fpwx'),
        meta: { title: '分配微信号'}
      },
      {
        path: 'yjtj',
        name: 'yjtj',
        component: () => import('@/views/sale/yjtj'),
        meta: { title: '业绩统计'}
      }
    ]
  }, {
    path: '/goodslist',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/goodslist/index'),
        meta: { title: '商品管理',icon:'list'}
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    alwaysShow: true,
    name: 'order',
    meta: { title: '订单管理', icon: 'list' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/order/index'),
        meta: { title: '所有订单'}
      },
    ]
  },
  {
    path: '/put',
    component: Layout,
    alwaysShow: true,
    name: 'put',
    meta: { title: '投放管理', icon: 'nested' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/put/index'),
        meta: { title: '加粉管理'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

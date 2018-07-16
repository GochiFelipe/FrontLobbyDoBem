import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)
const authUser = JSON.parse(localStorage.getItem('userAuth'))

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

export default router

// router.beforeEach((to, from, next) => {
//   const authUser = JSON.parse(window.localStorage.getItem('userAuth'))
//   console.log(to.meta.requiresAuth)
//   if (to.matched.some(
//     record => {
//       console.log(record)
//       // record.meta.requiresAuth
//     })
//   ) {
//     if (!authUser || !authUser.token) {
//       next({name: 'login'})
//     } else {
//       next()
//     }
//   }
// })
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('userAuth'))
//     if (!authUser || !authUser.token) {
//       next({name: 'login'})
//     } else {
//       next({name: 'dashboard'})
//     }
//   } else {
//     next()
//   }
// })

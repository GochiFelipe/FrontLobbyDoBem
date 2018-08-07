import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Atividades from '@/components/Atividades'

Vue.use(Router)
const authUser = JSON.parse(localStorage.getItem('userAuth'))
// const menuAdm = require('../assets/ico-menu-administracao.png')
const menuRelatorio = require('../assets/ico-menu-relatorio.png')
const menuCandidatos = require('../assets/ico-menu-candidatos.png')
const menuVoteMap = require('../assets/ico-menu-eleicoes.png')
const menuGeo = require('../assets/ico-menu-geolocalizacao.png')
const menuCorrelacao = require('../assets/ico-menu-correlacao.png')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/atividades',
      name: 'ATIVIDADES',
      component: Atividades,
      active: true,
      icon: menuRelatorio,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      active: false
    },
    {
      path: '/candidatos',
      name: 'DEPUTADOS FEDERAIS',
      component: Dashboard,
      active: true,
      icon: menuCandidatos,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/vereadores',
      name: 'VEREADORES SP',
      component: Dashboard,
      active: true,
      icon: menuCandidatos,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/votemap',
      name: 'VOTE MAP',
      component: Dashboard,
      active: true,
      icon: menuVoteMap,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/geolocalizacao',
      name: 'GEOLOCALIZAÇÃO',
      component: Dashboard,
      active: true,
      icon: menuGeo,
      beforeEnter (to, from, next) {
        if (authUser !== null && authUser.token) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/correlacao',
      name: 'CORRELAÇÃO',
      component: Dashboard,
      active: true,
      icon: menuCorrelacao,
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

import Vue from 'vue'
import Router from 'vue-router'

import Page from '@/views/Page/Page.vue'
import Admin from '@/views/Admin/Admin.vue'
import Interno from '@/views/Interno/Interno.vue'
import Externo from '@/views/Externo/Externo.vue'

// import ApkAdmin from '@/views/ApkAdmin/ApkAdmin'
// import ApkAuth from '@/views/ApkAuth/ApkAuth'
import NotFound from '@/views/DefaultViews/NotFound.vue'

 import store from '@/store'


Vue.use(Router)



export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    /**
     * PAGE
     */
    {
      path: '/',
      component: Page,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/Page/components/Home.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ '@/views/Page/components/About.vue')
        },
        {
          path: 'info',
          name: 'info',
          component: () => import(/* webpackChunkName: "info" */ '@/views/Page/components/Info.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ '@/views/Page/components/Login.vue')
        },
      ],
      beforeEnter: (to, from, next) => {
        if (Object.keys(store.state.user.data).length !== 0) {
          switch (store.state.user.data.role) {
            case 'Admin':
              next({ name: 'admin' })
              break;
            case 'Interno':
              next({ name: 'interno' })
              break;
            case 'Externo':
              next({ name: 'externo' })
              break;
            default:
              console.log('break')
              break;
          }
        } else {
          console.log('next')
          next ()
        }
      },
    },
    /**
     * ADMIN
     */
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '',
          name: 'admin',
          component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/Admin/components/Dashboard.vue')
        },
        {
          path: 'offices',
          component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components/Offices.vue'),
          children: [
            {
              path: '',
              name: 'offices',
              component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components/OfficesTable.vue'),
            },
            {
              path: 'office-edit/:id',
              name: 'office-edit',
              component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components/OfficeEdit.vue'),
            },
            {
              path: 'office-edit',
              name: 'office-create',
              component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components/OfficeCreate.vue'),
            }
          ]
        },
        {
          path: 'suboffices',
          name: 'suboffices',
          component: () => import(/* webpackChunkName: "admin-suboffices" */ '@/views/Admin/components/Suboffices.vue')
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import(/* webpackChunkName: "admin-roles" */ '@/views/Admin/components/Roles.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import(/* webpackChunkName: "admin-users" */ '@/views/Admin/components/Users.vue')
        }
      ],
      beforeEnter: (to, from, next) => {
        if (Object.keys(store.state.user.data).length !== 0) {
          switch (store.state.user.data.role) {
            case 'Admin':
              next()
              break;
            case 'Interno':
              next({ name: 'interno' })
              break;
            case 'Externo':
              next({ name: 'externo' })
              break;
            default:
              console.log('break')
              break;
          }
        } else {
          next({ name: 'home' })
        }
      }
    },
    /**
     * INTERNO
     */
    {
      path: '/interno',
      component: Interno,
      children: [
        {
          path: '',
          name: 'interno',
          component: () => import(/* webpackChunkName: "interno-dashboard" */ '@/views/Interno/components/Dashboard.vue')
        },
        {
          path: 'tramite',
          name: 'interno-tramite',
          component: () => import(/* webpackChunkName: "interno-tramite" */ '@/views/Interno/components/Tramite.vue')
        },
        {
          path: 'tramites-realizados',
          name: 'interno-tramites-realizados',
          component: () => import(/* webpackChunkName: "tramite-realizados" */ '@/views/Interno/components/TramitesRealizados.vue')
        },
        {
          path: 'lista-derivaciones',
          name: 'interno-lista-derivaciones',
          component: () => import(/* webpackChunkName: "lista-derivaciones" */ '@/views/Interno/components/ListaDerivaciones.vue')
        },
        {
          path: 'bandeja-derivaciones',
          name: 'interno-bandeja-derivaciones',
          component: () => import(/* webpackChunkName: "bandeja-derivaciones" */ '@/views/Interno/components/BandejaDerivaciones.vue')
        },
        {
          path: 'lista-archivaciones',
          name: 'interno-lista-archivaciones',
          component: () => import(/* webpackChunkName: "lista-archivaciones" */ '@/views/Interno/components/ListaArchivaciones.vue')
        },
        {
          path: 'detalle-expediente/:id',
          name: 'interno-detalle-expediente',
          component: () => import(/* webpackChunkName: "interno-detalle-expediente" */ '@/views/Interno/components/DetalleExpediente.vue')
        }
      ],
      beforeEnter: (to, from, next) => {
        if (Object.keys(store.state.user.data).length !== 0) {
          switch (store.state.user.data.role) {
            case 'Admin':
              next({ name: 'admin' })
              break;
            case 'Interno':
              next()
              break;
            case 'Externo':
              next({ name: 'externo' })
              break;
            default:
              console.log('break')
              break;
          }
        } else {
          next({ name: 'home' })
        }
      }
    },
    /**
     * EXTERNO
     */
    {
      path: '/externo',
      component: Externo,
      children: [
        {
          path: '',
          name: 'externo',
          component: () => import(/* webpackChunkName: "externo-dashboard" */ '@/views/Externo/components/Dashboard.vue')
        },
        {
          path: 'tramite',
          name: 'externo-tramite',
          component: () => import(/* webpackChunkName: "externo-tramite" */ '@/views/Externo/components/Tramite.vue')
        },
        {
          path: 'tramites-realizados',
          name: 'externo-tramites-realizados',
          component: () => import(/* webpackChunkName: "tramites-realizados" */ '@/views/Externo/components/TramitesRealizados.vue')
        },
        {
          path: 'detalle-expediente/:id',
          name: 'externo-detalle-expediente',
          component: () => import(/* webpackChunkName: "externo-bandeja" */ '@/views/Externo/components/DetalleExpediente.vue')
        }
      ],
      beforeEnter: (to, from, next) => {
        if (Object.keys(store.state.user.data).length !== 0) {
          switch (store.state.user.data.role) {
            case 'Admin':
              next({ name: 'admin' })
              break;
            case 'Interno':
              next({ name: 'interno' })
              break;
            case 'Externo':
              next()
              break;
            default:
              console.log('break')
              break;
          }
        } else {
          next({ name: 'home' })
        }
      }
    },

    { path: '*', component: NotFound }
  ]
})

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
        {
          path: 'password-recovery/:emailId',
          name: 'password-recorery',
          component: () => import(/* webpackChunkName: "login" */ '@/views/Page/components/PasswordRecovery.vue')
        },
        {
          path: 'ddd',
          name: 'ddd',
          component: () => import(/* webpackChunkName: "login" */ '@/views/Page/components/DDDDD.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import(/* webpackChunkName: "register" */ '@/views/Page/components/Register.vue')
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
              component: () => import(/* webpackChunkName: "admin-offices-edit" */ '@/views/Admin/components/OfficeEdit.vue'),
            },
            {
              path: 'office-create',
              name: 'office-create',
              component: () => import(/* webpackChunkName: "admin-offices-created" */ '@/views/Admin/components/OfficeCreate.vue'),
            }
          ]
        },
        {
          path: 'suboffices',
          component: () => import(/* webpackChunkName: "admin-suboffices" */ '@/views/Admin/components/Suboffices.vue'),
          children: [
            {
              path: '',
              name: 'suboffices',
              component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components/Suboffices/SubofficesTable.vue'),
            },
            {
              path: 'suboffice-edit/:id',
              name: 'suboffice-edit',
              component: () => import(/* webpackChunkName: "admin-offices-edit" */ '@/views/Admin/components/Suboffices/SubofficeEdit.vue'),
            },
            {
              path: 'suboffice-create',
              name: 'suboffice-create',
              component: () => import(/* webpackChunkName: "admin-offices-created" */ '@/views/Admin/components/Suboffices/SubofficeCreate.vue'),
            }
          ]
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import(/* webpackChunkName: "admin-roles" */ '@/views/Admin/components/Roles.vue')
        },
        {
          path: 'users',
          component: () => import(/* webpackChunkName: "admin-users" */ '@/views/Admin/components/Users.vue'),
          children: [
            {
              path: '',
              name: 'users',
              component: () => import(/* webpackChunkName: "admin-offices" */ '@/views/Admin/components//User-Action/UsersTable.vue'),
            },
            {
              path: 'user-edit/:id',
              name: 'user-edit',
              component: () => import(/* webpackChunkName: "admin-users-edit" */ '@/views/Admin/components/User-Action/UserEdit.vue'),
            },
            {
              path: 'user-create',
              name: 'user-create',
              component: () => import(/* webpackChunkName: "admin-users-created" */ '@/views/Admin/components//User-Action/UserCreate.vue'),
            },

          ]
        },
        
        {
          path: 'users-externos',
          component: () => import(/* webpackChunkName: "admin-users-externos" */ '@/views/Admin/components/UsersExternos.vue'),
          children : [
            {
              path: '',
              name: 'users-externos',
              component: () => import(/* webpackChunkName: "admin-users-externos" */ '@/views/Admin/components/User-Externo-Action/UserExternoTable.vue'),
            },
            {
              path: 'user-externo-edit/:id',
              name: 'user-externo-edit',
              component: () => import(/* webpackChunkName: "admin-user-externo-edit" */ '@/views/Admin/components/User-Externo-Action/UserExternoEdit.vue'),
            },
            {
              path: 'user-externo-create',
              name: 'user-externo-create',
              component: () => import(/* webpackChunkName: "admin-users-externo-created" */ '@/views/Admin/components/User-Externo-Action/UserExternoCreate.vue'),
            },
          ]
        },
        {
          path: 'users-internos',
          component: () => import(/* webpackChunkName: "admin-users-internos" */ '@/views/Admin/components/UsersInternos.vue'),
          children: [
            {
              path: '',
              name: 'users-internos',
              component: () => import(/* webpackChunkName: "admin-users-internos" */ '@/views/Admin/components/User-Interno-Action/UserInternoTable.vue'),
            },
            {
              path: 'user-interno-edit/:id',
              name: 'user-interno-edit',
              component: () => import(/* webpackChunkName: "admin-user-interno-edit" */ '@/views/Admin/components/User-Interno-Action/UserInternoEdit.vue'),
            },
            {
              path: 'user-interno-create',
              name: 'user-interno-create',
              component: () => import(/* webpackChunkName: "admin-users-created" */ '@/views/Admin/components/User-Interno-Action/UserInternoCreate.vue'),
            },
          ]
        },
        {
          path: 'admin-actualizar-password/:user_id',
          name: 'admin-actualizar-password',
          component: () => import(/* webpackChunkName: "perfil-externo" */ '@/views/Admin/components/UpdatePassword.vue')
        },
        {
          path: 'expedientes-derivados',
          name: 'expedientes-derivados',
          component: () => import(/* webpackChunkName: "admin-expedientes-derivados" */ '@/views/Admin/components/ExpedientesDerivados.vue')
        },
        {
          path: 'expedientes-archivados',
          name: 'expedientes-archivados',
          component: () => import(/* webpackChunkName: "admin-expedientes-archivados" */ '@/views/Admin/components/ExpedientesArchivados.vue')
        },
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
          path: 'detalle-tramite/:expedient_id',
          name: 'interno-detalle-tramite',
          component: () => import(/* webpackChunkName: "interno-detalle-tramite" */ '@/views/Interno/components/DetalleTramite.vue')
        },
        {
          path: 'lista-derivaciones',
          name: 'interno-lista-derivaciones',
          component: () => import(/* webpackChunkName: "lista-derivaciones" */ '@/views/Interno/components/ListaDerivaciones.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'bandeja-derivaciones',
          name: 'interno-bandeja-derivaciones',
          component: () => import(/* webpackChunkName: "bandeja-derivaciones" */ '@/views/Interno/components/BandejaDerivaciones.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'lista-archivaciones',
          name: 'interno-lista-archivaciones',
          component: () => import(/* webpackChunkName: "lista-archivaciones" */ '@/views/Interno/components/ListaArchivaciones.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'detalle-archivacion/:archivation_id/:expedient_id',
          name: 'interno-detalle-archivacion',
          component: () => import(/* webpackChunkName: "interno-detalle-archivacion" */ '@/views/Interno/components/DetalleArchivacion.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'detalle-expediente/:derivation_id/:expedient_id',
          name: 'interno-detalle-expediente',
          component: () => import(/* webpackChunkName: "interno-detalle-expediente" */ '@/views/Interno/components/DetalleExpediente.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'detalle-expediente-derivar/:derivation_id/:expedient_id',
          name: 'interno-detalle-expediente-derivar',
          component: () => import(/* webpackChunkName: "interno-detalle-expediente-derivar" */ '@/views/Interno/components/DetalleExpedienteDerivar.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.user.data.employee_type === 'trabajador') {
              next({ name: 'interno' })
            } else {
              next()
            }
          }
        },
        {
          path: 'perfil-interno',
          name: 'perfil-interno',
          component: () => import(/* webpackChunkName: "perfil-interno" */ '@/views/Interno/components/PerfilInterno.vue')
        },
        {
          path: 'interno-actualizar-password',
          name: 'interno-actualizar-password',
          component: () => import(/* webpackChunkName: "perfil-externo" */ '@/views/Interno/components/UpdatePassword.vue')
        },
        {
          path: 'reporte-tramites',
          name: 'reporte-tramites',
          component: () => import(/* webpackChunkName: "reporte-tramites" */ '@/views/Interno/components/ReportTramites.vue')
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
        },
        {
          path: 'perfil-externo',
          name: 'perfil-externo',
          component: () => import(/* webpackChunkName: "perfil-externo" */ '@/views/Externo/components/PerfilExterno.vue')
        },
        {
          path: 'externo-actualizar-password',
          name: 'externo-actualizar-password',
          component: () => import(/* webpackChunkName: "perfil-externo" */ '@/views/Externo/components/UpdatePassword.vue')
        },
        {
          path: 'externo-date-update',
          name: 'externo-date-update',
          component: () => import(/* webpackChunkName: "externo-date-update" */ '@/views/Externo/components/ExternoDateUpdate.vue')
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

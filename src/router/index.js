import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ProductsView.vue'
import UsersView from '../views/UsersView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import TiendaView from '../views/TiendaView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usuarioLogueado')) {
        const rol = localStorage.getItem('rolUsuario')
        next(rol === 'Admin' ? '/dashboard/productos' : '/tienda')
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/productos',
    meta: { requiresAuth: true, rol: 'Admin' },
    children: [
      { path: 'productos', component: ProductsView, meta: { requiresAuth: true, rol: 'Admin' } },
      { path: 'usuarios', component: UsersView, meta: { requiresAuth: true, rol: 'Admin' } }
    ]
  },
  {
    path: '/tienda',
    component: TiendaView,
    meta: { requiresAuth: true, rol: 'User' }
  },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem('usuarioLogueado')
  const rol = localStorage.getItem('rolUsuario')
  if (to.meta.requiresAuth && !logueado) {
    next('/login')
  } else if (to.meta.rol && to.meta.rol !== rol) {
    next(rol === 'Admin' ? '/dashboard/productos' : '/tienda')
  } else {
    next()
  }
})

export default router
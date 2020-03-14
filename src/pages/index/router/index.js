import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    name: 'hello',
    component: () => import('../components/hello.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

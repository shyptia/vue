import { createRouter, createWebHistory } from 'vue-router'
import TransactionList from '../views/TransactionsList.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: TransactionList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

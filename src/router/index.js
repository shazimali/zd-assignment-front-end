import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Tasks from '../views/tasks/Index.vue'
import TaskCreate from '../views/tasks/Create.vue'
import TaskEdit from '../views/tasks/Edit.vue'
import Users from '../views/users/Index.vue'
import UserCreate from '../views/users/Create.vue'
import UserEdit from '../views/users/Edit.vue'
import auth from '../middleware/auth'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: auth,
    },
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: auth,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: TaskCreate
  },
  {
    path: '/tasks/edit/:id',
    name: 'TaskEdit',
    component: TaskEdit
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: UserCreate
  },
  {
    path: '/users/edit/:id',
    name: 'UserEdit',
    component: UserEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem('token')) next({ name: 'Login' })
  else if(to.name == 'Login' && localStorage.getItem('token')) next({name: 'Dashboard'})
  else if(to.name == 'Login' && localStorage.getItem('token') && localStorage.getItem('type') == 'WORKER' && (to.name.includes('User') || to.name.includes('TaskCreate') || to.name.includes('TaskEdit'))) next({name: 'Tasks'})
  else next()
})


export default router

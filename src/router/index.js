import Vue from 'vue'
import VueRouter from 'vue-router'
import AddSector from "../components/AdminPanel/AddSector";
import DelPage from "../components/AdminPanel/DelPage";
import Admins from "../components/AdminPanel/Admins";
import UpdProfile from "../components/AdminPanel/UpdProfile";
import store from "@/store"
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin'),
        meta: { requiresAuth: true },
        children: [
            {
                path: 'addSector',
                component: AddSector
            },
            {
                path: 'del',
                component: DelPage
            },

            {
                path: 'updProfile',
                component: UpdProfile
            },
            {
                path: 'users',
                component: Admins
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.isAuth) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})
export default router

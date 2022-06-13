import Vue from 'vue'
import VueRouter from 'vue-router'
import AddSector from "../components/AdminPanel/AddSector";
import ChangeSector from "../components/AdminPanel/ChangeSector";
import AddDescription from "../components/AdminPanel/AddDescription";
import DelPage from "../components/AdminPanel/DelPage";
import Admins from "../components/AdminPanel/Admins";
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
                component: AddSector,
                meta: {
                    isAdmin: true
                }
            },
            {
                path: 'addDescription',
                component: AddDescription,
                meta: {
                    isAdmin: true
                }
            },
            {
                path: 'changeSector',
                component: ChangeSector,
                meta: {
                    isSuperAdmin: true
                }
            },
            {
                path: 'del',
                component: DelPage
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

// Проверяем Суперадмина
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isSuperAdmin)) {
        if (store.state.role==="super.admin") {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

// Проверяем админа
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAdmin)) {
        if (store.state.role==="admin") {
            next()
            return
        }
        next('/admin/changeSector/')
    } else {
        next()
    }
})
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import AddSector from "../components/AddSector";
import AddProfile from "../components/AddProfile";
import DelPage from "../components/DelPage";
import UpdProfile from "../components/UpdProfile";
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
                path: 'addProfile',
                component: AddProfile
            },
            {
                path: 'updProfile',
                component: UpdProfile
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters.isAuthenticated) {
//             next()
//             console.log("hello from router/index.js, beforeEach_func")
//             return
//         }
//         next('/Authorization')
//     } else {
//         next()
//     }
// })
export default router

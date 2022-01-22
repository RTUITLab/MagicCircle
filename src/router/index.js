import Vue from 'vue'
import VueRouter from 'vue-router'
import AddPage from "../components/AddPage";
import DelPage from "../components/DelPage";
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
                // при совпадении пути с шаблоном /user/:id/profile
                // в <router-view> компонента User будет показан UserProfile
                path: 'add',
                component: AddPage
            },
            {
                // при совпадении пути с шаблоном /user/:id/posts
                // в <router-view> компонента User будет показан UserPosts
                path: 'del',
                component: DelPage
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

import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Home from '../screens/Home.vue'
import Product from '../screens/Product.vue'
import Category from '../screens/Category.vue'
import Search from '../screens/Search.vue'
import Cart from '../screens/Cart.vue'
import Signup from '../screens/Signup.vue'
import Login from '../screens/Login.vue'
import MyAccount from '../screens/MyAccount.vue'
import Checkout from '../screens/Checkout.vue'
import Success from '../screens/Success.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../screens/About.vue')
    },
    {
        path: '/sign-up',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/cart/success',
        name: 'Success',
        component: Success
    },
    {
        path: '/cart/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: Product
    },
    {
        path: '/:category_slug',
        name: 'Category',
        component: Category
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({ name: 'Login', query: { to: to.path } });
    } else {
        next()
    }
})

export default router

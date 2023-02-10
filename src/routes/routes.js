import { createRouter, createWebHistory } from 'vue-router'
import Login from '../Login';
import Forgot from '../ForgotPassword.vue';
import Reset from '../ResetPassword.vue';
import Home from '../pages/Home';
import Room from '../pages/Room';
import DetailRoom from '../pages/DetailRoom';
import Booking from '../pages/Booking.vue';
import MyBooking from '../pages/MyBooking.vue';
import Membership from '../pages/Membership.vue';
import Profile from '../pages/Profile.vue';

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/forgot-password',
        component: Forgot
    },
    {
        path: '/reset-password',
        component: Reset
    },
    {
        path: '/',
        name:'home',
        component: Home
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: Room
    },
    {
        path: '/rooms-detail',
        name: 'rooms-detail',
        component: DetailRoom
    },
    {
        path: '/booking',
        name: 'booking',
        component: Booking
    },
    {
        path: '/my-booking',
        name: 'my-booking',
        component: MyBooking
    },
    {
        path: '/membership',
        name: 'membership',
        component: Membership
    },
    {
        path: '/profile',
        name: '/profile',
        component: Profile
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/forgot-password', '/reset-password'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page

    if (authRequired && !loggedIn) {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    } else {
        next()
    }

});
export default router

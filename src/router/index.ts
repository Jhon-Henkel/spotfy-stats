import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SyncAccount from "@/views/syncAccount/SyncAccount.vue";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sincronizar-conta',
        name: 'SyncAccount',
        component: SyncAccount
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

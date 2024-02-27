import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SyncAccount from "@/views/syncAccount/SyncAccount.vue";
import HomeView from "@/views/HomeView.vue";
import ArtistDetailsView from "@/views/artist/ArtistDetailsView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/sincronizar-conta',
        name: 'SyncAccount',
        component: SyncAccount
    },
    {
        path: '/artista/:id',
        name: 'ArtistDetails',
        component: ArtistDetailsView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SyncAccount from "@/views/syncAccount/SyncAccount.vue";
import HomeView from "@/views/HomeView.vue";
import TopTracksView from "@/views/topItems/TopTracksView.vue";
import TopArtistsView from "@/views/topItems/TopArtistsView.vue";

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
        path: '/top-musicas',
        name: 'TopTracks',
        component: TopTracksView
    },
    {
        path: '/top-artistas',
        name: 'TopArtists',
        component: TopArtistsView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

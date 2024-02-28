import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SyncAccount from "@/views/syncAccount/SyncAccount.vue";
import HomeView from "@/views/HomeView.vue";
import ArtistDetailsView from "@/views/artist/ArtistDetailsView.vue";
import TrackDetailsView from "@/views/track/TrackDetailsView.vue";

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
    },
    {
        path: '/musica/:id',
        name: 'TrackDetails',
        component: TrackDetailsView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

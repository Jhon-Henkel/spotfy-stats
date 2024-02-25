<template>
    <!-- todo se não tiver conectado, deve redirecionar para a tela de conexão -->
    <!-- todo alterar o favicon -->
    <!-- todo alterar o nome na guia do navegador -->
    <!-- todo background no tema do Spotify -->
    <ion-app class="main-content">
        <ion-content>
            <ion-router-outlet></ion-router-outlet>
        </ion-content>
    </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet, IonContent} from '@ionic/vue';
import {ref} from "vue";
import {SpotifyAuthStore} from "@/services/spotify/auth/stores/authStore";
import router from "@/router";

const store = SpotifyAuthStore()
const isSync: boolean = !!ref(store.accessToken).value

if (! isSync) {
    router.push({ name: 'SyncAccount' })
}
</script>

<style scoped>
.main-content {
    height: 100%;
    width: 100%;
}
</style>

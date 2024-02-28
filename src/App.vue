<template>
    <ion-app class="main-content">
        <ion-content class="app-content ion-padding-bottom">
            <app-home-header />
            <suspense>
                <template #default>
                    <router-view></router-view>
                </template>
                <template #fallback>
                    <h1>Carregando...</h1>
                </template>
            </suspense>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-title>
                    Desenvolvido por
                    <a href="https://jhon.dev.br" target="_blank" class="footer-link">Jhon</a>
                </ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonContent, IonTitle, IonToolbar, IonFooter} from '@ionic/vue';
import router from "@/router";
import SpotifyAuthService from "@/services/spotify/auth/authService";
import AppHomeHeader from "@/components/header/AppHomeHeader.vue";

const service = new SpotifyAuthService()

if (service.mustRequestSpotifyLogin()) {
    router.push({ name: 'SyncAccount' })
}
</script>

<style scoped>
.main-content {
    height: 100%;
    width: 100%;
}
.footer-link {
    color: var(--ion-color-success);
    text-decoration: none;
}
.app-content {
    --padding-bottom: 60px;
    padding-bottom: 60px;
}
</style>

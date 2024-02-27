<template>
    <!-- todo alterar o favicon -->
    <!-- todo background no tema do Spotify -->
    <ion-app class="main-content">
        <ion-content>
            <suspense>
                <template #default>
                    <router-view></router-view>
                </template>
                <template #fallback>
                    <h1>Carregando...</h1>
                </template>
            </suspense>
        </ion-content>
    </ion-app>
    <!-- todo criar footer -->
</template>

<script setup lang="ts">
import {IonApp, IonContent} from '@ionic/vue';
import router from "@/router";
import SpotifyAuthService from "@/services/spotify/auth/authService";

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
</style>

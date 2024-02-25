<script setup lang="ts">
import {IonRow, IonButton, IonCol, IonGrid, IonIcon, alertController} from "@ionic/vue";
import SpotifyAuthService from "@/services/spotify/auth/authService";
import SyncStatus from "@/components/status/SyncStatus.vue";
import {useRouter} from "vue-router";

const spotifyService = new SpotifyAuthService()
const spotifyAuthUrl = spotifyService.getUrlRequestCode()
const urlParams = new URLSearchParams(location.search)
const error = urlParams.get('error') ?? null
const code = urlParams.get('code') ?? null
const state = urlParams.get('state') ?? null
const router = useRouter();

if (error) {
    showAlert()
}

if (state) {
    if (code && spotifyService.isValidateState(state)) {
        requestToken(code)
    }
}

async function showAlert() {
    const alert = await alertController.create({
        header: 'Erro ao sincronizar conta!',
        message: 'Tente fazer a sincronização novamente.',
        buttons: ['Ok'],
    });

    await alert.present();
}

async function requestToken(code: string) {
    const response = await spotifyService.requestAndSavedToken(code)
    if (! response) {
        await showAlert()
    }
    await router.push({ name: 'Home' })
}

async function removeStore() {
    spotifyService.removeToken()
    await router.push({ name: 'Home' })
}

</script>

<template>
    <!-- todo alinhar conteúdo verticalmente -->
    <ion-grid class="ion-align-items-center">
        <ion-row>
            <ion-col size="2" />
            <ion-col size="8">
                <sync-status />
            </ion-col>
            <ion-col size="2" />
        </ion-row>
        <ion-row>
            <ion-col size="2" />
            <ion-col size="8">
                <ion-button expand="block" color="success" :href="spotifyAuthUrl">
                    <ion-icon name="lock-open-outline" class="ion-padding-end" />
                    Sincronizar Conta
                </ion-button>
            </ion-col>
            <ion-col size="2" />
        </ion-row>
        <ion-row>
            <ion-col size="2" />
            <ion-col size="8">
                <ion-button expand="block" color="danger" @click="removeStore()">
                    <ion-icon name="lock-closed-outline" class="ion-padding-end" />
                    Dessincronizar Conta
                </ion-button>
            </ion-col>
            <ion-col size="2" />
        </ion-row>
    </ion-grid>
</template>
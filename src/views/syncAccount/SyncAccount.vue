<script setup lang="ts">
import {IonRow, IonButton, IonBadge, IonText, IonCol, IonGrid, alertController} from "@ionic/vue";
import SpotifyAuthService from "@/services/spotify/auth/authService";

const spotifyService = new SpotifyAuthService()
const spotifyAuthUrl = spotifyService.getUrlRequestCode()
const urlParams = new URLSearchParams(location.search)
const error = urlParams.get('error') ?? null
const code = urlParams.get('code') ?? null
const state = urlParams.get('state') ?? null

if (error) {
    showAlert()
}

if (state) {
    if (code && spotifyService.validateState(state)) {
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
}

</script>

<template>
    <!-- todo alinhar conteúdo verticalmente -->
    <ion-grid>
        <ion-row>
            <ion-col size="2"></ion-col>
            <!-- todo alinhar badge com o texto verticalmente -->
            <ion-col size="8" class="">
                <ion-text>
                    Status:
                </ion-text>
                <!-- todo o status deve ser dinâmico -->
                <ion-badge color="success">
                    Sincronizado
                </ion-badge>
            </ion-col>
            <ion-col size="2"></ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="2"></ion-col>
            <ion-col size="8">
                <ion-button expand="block" color="success" :href="spotifyAuthUrl">
                    <!-- todo ver o por que o texto ficou maiúsculo -->
                    <!-- todo Colocar ícone do Spotify -->
                    Sincronizar Conta
                </ion-button>
            </ion-col>
            <ion-col size="2"></ion-col>
        </ion-row>
    </ion-grid>
</template>
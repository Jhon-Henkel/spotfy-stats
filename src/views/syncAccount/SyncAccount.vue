<script setup lang="ts">
import {IonRow, IonButton, IonCol, IonGrid, IonIcon, alertController} from "@ionic/vue";
import SpotifyAuthService from "@/services/spotify/auth/authService";
import {SpotifyTopItemsStore} from "@/services/spotify/topItems/topItemsStore";
import {useRouter} from "vue-router";
import {SpotifyUserStore} from "@/services/spotify/user/userStore";
import AppHomeHeader from "@/components/header/AppHomeHeader.vue";
import SpotifyUserService from "@/services/spotify/user/userService";
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";

const spotifyService = new SpotifyAuthService()
const spotifyAuthUrl = spotifyService.getUrlRequestCode()
const urlParams = new URLSearchParams(location.search)
const error = urlParams.get('error') ?? null
const code = urlParams.get('code') ?? null
const state = urlParams.get('state') ?? null
const router = useRouter();

if (error) {
    showErrorAlert()
}

if (state) {
    if (code && spotifyService.isValidateState(state)) {
        requestToken(code)
    }
}

async function showErrorAlert() {
    const alert = await alertController.create({
        header: 'Erro ao sincronizar conta!',
        message: 'Tente fazer a sincronização novamente.',
        buttons: ['Ok'],
    });

    await alert.present();
}

async function showRemovedAlert() {
    const alert = await alertController.create({
        header: 'Dados removidos!',
        message: 'Faça o login novamente.',
        buttons: ['Ok'],
    });

    await alert.present();
}

async function requestToken(code: string) {
    const response = await spotifyService.requestAndSavedToken(code)
    if (! response) {
        await showErrorAlert()
    }
    removeItemsFromLocalStorage()
    getAllDataAndPutOnLocalStorage()
    await router.push({ name: 'Home' })
}

async function removeStore() {
    spotifyService.removeToken()
    removeItemsFromLocalStorage()
    await showRemovedAlert()
}

function removeItemsFromLocalStorage() {
    SpotifyTopItemsStore().removeTopItems()
    SpotifyUserStore().removeUserProfile()
}

function getAllDataAndPutOnLocalStorage() {
    new SpotifyUserService().getUserProfile()
    const topItensService = new SpotifyTopItemsService()
    topItensService.getTopArtistsAllTime()
    topItensService.getTopTracksAllTime()
    topItensService.getTopArtistsLastSixMonths()
    topItensService.getTopTracksLastSixMonths()
    topItensService.getTopArtistsLastFourWeeks()
    topItensService.getTopTracksLastFourWeeks()
}

</script>

<template>
    <ion-grid class="ion-align-items-center">
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="success" :href="spotifyAuthUrl">
                    <ion-icon name="lock-open-outline" class="ion-padding-end" />
                    Conectar Spotify
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="danger" @click="removeStore()">
                    <ion-icon name="lock-closed-outline" class="ion-padding-end" />
                    Desconectar Spotify
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="success" @click="router.push({name: 'Home'})">
                    Voltar
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
    </ion-grid>
</template>
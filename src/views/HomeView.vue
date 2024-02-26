<script setup lang="ts">
import {IonButton, IonCol, IonIcon, IonRow, IonGrid} from "@ionic/vue";
import router from "@/router";
import AppHomeHeader from "@/components/header/AppHomeHeader.vue";
</script>

<template>
    <app-home-header></app-home-header>
    <ion-grid>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="success" @click="router.push({ name: 'TopTracks' })">
                    <ion-icon name="musical-notes-outline" class="ion-padding-end" />
                    Top Musicas
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="success" @click="router.push({ name: 'TopArtists' })">
                    <ion-icon name="mic-outline" class="ion-padding-end" />
                    Top Artistas
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10">
                <ion-button expand="block" color="success" @click="router.push({ name: 'SyncAccount' })">
                    <ion-icon name="sync-outline" class="ion-padding-end" />
                    Sincronizar Conta
                </ion-button>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
    </ion-grid>
</template>
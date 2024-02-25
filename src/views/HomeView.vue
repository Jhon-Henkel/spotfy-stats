<script setup lang="ts">
import {IonButton, IonCol, IonIcon, IonRow, IonGrid} from "@ionic/vue";
import router from "@/router";
</script>

<template>
    <ion-grid>
        <ion-row>
            <ion-col size="2" />
            <ion-col size="8">
                <ion-button expand="block" color="success" @click="router.push({ name: 'TopTracks' })">
                    <ion-icon name="musical-notes-outline" class="ion-padding-end" />
                    Top Musicas
                </ion-button>
            </ion-col>
            <ion-col size="2" />
        </ion-row>
        <ion-row>
            <ion-col size="2" />
            <ion-col size="8">
                <ion-button expand="block" color="success" @click="router.push({ name: 'TopArtists' })">
                    <ion-icon name="mic-outline" class="ion-padding-end" />
                    Top Artistas
                </ion-button>
            </ion-col>
            <ion-col size="2" />
        </ion-row>
    </ion-grid>
</template>
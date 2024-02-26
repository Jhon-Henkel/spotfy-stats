<script setup lang="ts">
import {IonIcon, IonHeader, IonToolbar, IonRow, IonCol, IonTitle, IonButton} from "@ionic/vue";
import router from "@/router";
</script>

<template>
    <ion-header>
        <ion-toolbar>
            <ion-row>
                <ion-col size="1" />
                <ion-col size="3" />
                <ion-col size="4" class="title-col">
                    <ion-title class="ion-text-center" color="success">
                        <slot />
                    </ion-title>
                </ion-col>
                <ion-col size="3" class="ion-text-end">
                    <ion-button color="success" @click="router.push({name: 'Home'})">
                        <ion-icon name="home-outline" />
                    </ion-button>
                </ion-col>
                <ion-col size="1" />
            </ion-row>
        </ion-toolbar>
    </ion-header>
</template>

<style scoped>
.title-col {
    display: flex;
    align-items: center;
}
</style>
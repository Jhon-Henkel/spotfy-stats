<script setup lang="ts">
import {IonCol, IonGrid, IonRow, IonToolbar, IonHeader, IonTitle, IonChip, IonAvatar, IonLabel} from "@ionic/vue";
import UserProfile from "@/components/user/UserProfile.vue";

const url: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'
</script>

<template>
    <ion-header>
        <ion-toolbar>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col class="ion-text-start">
                        <ion-title color="success" class="padding">
                            <strong>Music Status</strong>
                        </ion-title>
                    </ion-col>
                    <ion-col class="ion-text-end">
                        <suspense>
                            <template #default>
                                <user-profile />
                            </template>
                            <template #fallback>
                                <ion-chip>
                                    <ion-avatar>
                                        <img alt="profile picture" :src="url" />
                                    </ion-avatar>
                                    <ion-label>Usuário</ion-label>
                                </ion-chip>
                            </template>
                        </suspense>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-toolbar>
    </ion-header>
</template>

<style scoped>
    .padding {
        padding-inline-start : 0 !important;
        -webkit-padding-start: 0 !important;
    }
</style>
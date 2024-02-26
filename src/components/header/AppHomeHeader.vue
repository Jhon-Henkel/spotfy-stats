<script setup lang="ts">
import {IonCol, IonGrid, IonRow, IonToolbar, IonHeader, IonTitle} from "@ionic/vue";
import SyncStatus from "@/components/status/SyncStatus.vue";
import UserProfile from "@/components/user/UserProfile.vue";

</script>

<template>
    <ion-header>
        <ion-toolbar>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col size="1" />
                    <ion-col size="3" class="ion-justify-content-start">
                        <sync-status />
                    </ion-col>
                    <ion-col size="4" class="ion-text-center">
                        <ion-title color="success">
                            Spotify Status
                        </ion-title>
                    </ion-col>
                    <ion-col size="3" class="ion-text-end">
                        <user-profile />
                    </ion-col>
                    <ion-col size="1" />
                </ion-row>
            </ion-grid>
        </ion-toolbar>
    </ion-header>
</template>
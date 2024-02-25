<script setup lang="ts">
import {IonCol, IonGrid, IonRow} from "@ionic/vue";
import SyncStatus from "@/components/status/SyncStatus.vue";
import UserProfile from "@/components/user/UserProfile.vue";

</script>

<template>
    <ion-grid>
        <ion-row class="ion-align-items-center">
            <ion-col size="1" />
            <ion-col size="5" class="ion-justify-content-start">
                <sync-status />
            </ion-col>
            <ion-col size="5" class="ion-text-end">
                <user-profile />
            </ion-col>
            <ion-col size="1" />
        </ion-row>
    </ion-grid>
</template>
<script setup lang="ts">
import {IonRow, IonIcon, IonText, IonCol} from "@ionic/vue";
import { SpotifyAuthStore } from "@/services/spotify/auth/authStore";
import {ref} from "vue";
import router from "@/router";

const store = SpotifyAuthStore()
const isSync: boolean = !!ref(store.accessToken).value
</script>

<template>
    <ion-row>
        <ion-col>
            <ion-text class="status-component">
                Status:
                <ion-icon :name="isSync ? 'checkmark-circle-outline' : 'close-circle-outline'"
                          :color="isSync ? 'success' : 'danger'"
                          size="small"
                          class="ion-padding-start icon-status"
                          @click="router.push({name: 'SyncAccount'})"/>
            </ion-text>
        </ion-col>
    </ion-row>
</template>

<style scoped>
.status-component {
    display: flex;
    align-items: center;
}
.icon-status {
    cursor: pointer;
}
</style>
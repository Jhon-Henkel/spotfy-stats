<script setup lang="ts">
import {IonRow, IonIcon, IonText, IonCol} from "@ionic/vue";
import { SpotifyAuthStore } from "@/services/spotify/auth/authStore";
import {ref} from "vue";

const store = SpotifyAuthStore()
const isSync: boolean = !!ref(store.accessToken).value

</script>

<template>
    <ion-row>
        <ion-col>
            <ion-text class="status-component">
                Sincronizado:
                <ion-icon :name="isSync ? 'checkmark-circle-outline' : 'close-circle-outline'"
                          :color="isSync ? 'success' : 'danger'"
                          size="small"
                          class="ion-padding-start"/>
            </ion-text>
        </ion-col>
    </ion-row>
</template>

<style scoped>
.status-component {
    display: flex;
    align-items: center;
}
</style>
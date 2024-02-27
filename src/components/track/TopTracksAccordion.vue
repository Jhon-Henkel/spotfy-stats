<script lang="ts">

import {IonAccordion, IonItem, IonLabel, IonItemDivider, IonGrid, IonRow, IonCol, IonBadge, IonText} from "@ionic/vue";
import SpotifyTopTrackEntity from "@/services/spotify/topItems/TopTrackEntity";
import router from "@/router";

export default {
    methods: {
        router() {
            return router
        }
    },
    props: {
        tracks: {
            type: Array<SpotifyTopTrackEntity>,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    setup() {
        return {}
    },
    components: {
        IonAccordion,
        IonItem,
        IonLabel,
        IonItemDivider,
        IonGrid,
        IonRow,
        IonCol,
        IonBadge,
        IonText
    }
}
</script>

<template>
    <ion-accordion :value="position">
        <ion-item slot="header" color="success">
            <ion-label>{{ label }}</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
            <ion-item-divider v-for="(track, index) in tracks" :key="index">
                <ion-grid>
                    <ion-row class="ion-text-start" @click="router().push({name: 'TrackDetails', params: {id: track.id}})">
                        <ion-col size="2" class="position-col">
                            <ion-badge color="success" class="position-badge">
                                # {{ (index + 1) }}
                            </ion-badge>
                        </ion-col>
                        <ion-col size="2" class="position-col">
                            <img :src="track.albumImageUrl" alt="album cover" class="album-image">
                        </ion-col>
                        <ion-col size="8">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="track-name">
                                            {{ track?.name }}
                                        </ion-label>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-text>
                                            {{ track.artist }}
                                        </ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item-divider>
        </div>
    </ion-accordion>
</template>

<style scoped>
.position-col {
    display: flex;
    align-items: center;
}
.position-badge {
    --padding-end: 20%;
    --padding-start: 20%;
    --padding-top: 10%;
    --padding-bottom: 10%;
}
.track-name {
    font-size: 1.2em;
    font-weight: 700;
    color: #ffffff;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.album-image {
    min-width: 50px;
    min-height: 50px;
}
</style>
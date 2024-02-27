<script lang="ts">

import {
    IonAccordion,
    IonBadge,
    IonCol,
    IonGrid,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonRow,
    IonText
} from "@ionic/vue";
import SpotifyTopArtistEntity from "@/services/spotify/topItems/TopArtistEntity";
import router from "@/router";

export default {
    methods: {
        router() {
            return router
        }
    },
    components: {
        IonAccordion,
        IonItem,
        IonBadge,
        IonText,
        IonLabel,
        IonItemDivider,
        IonRow,
        IonGrid,
        IonCol
    },
    props: {
        artists: {
            type: Array<SpotifyTopArtistEntity>,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>

<template>
    <ion-accordion :value="position">
        <ion-item slot="header" color="success">
            <ion-label>{{ label }}</ion-label>
        </ion-item>
        <div class="ion-padding" slot="content">
            <ion-item-divider v-for="(artist, index) in artists" :key="index">
                <ion-grid>
                    <ion-row class="ion-text-start" @click="router().push({name: 'ArtistDetails', params: {id: artist.id}})">
                        <ion-col size="2" class="position-col">
                            <ion-badge color="success" class="position-badge">
                                # {{ (index + 1) }}
                            </ion-badge>
                        </ion-col>
                        <ion-col size="2" class="position-col">
                            <img :src="artist.imageUrl" alt="artist image" class="artist-image">
                        </ion-col>
                        <ion-col size="8">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="artist-name">
                                            {{ artist.name }}
                                        </ion-label>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-text>
                                            {{ artist.followers.toLocaleString() }} seguidores
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
.artist-name {
    font-size: 1.2em;
    font-weight: 700;
    color: #ffffff;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.artist-image {
    min-width: 50px;
    min-height: 50px;
}
</style>
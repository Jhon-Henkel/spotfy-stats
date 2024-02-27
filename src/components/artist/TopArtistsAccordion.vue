<script lang="ts">

import {
    IonAccordion,
    IonBadge,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonRow,
    IonText
} from "@ionic/vue";

export default {
    components: {
        IonAccordion,
        IonIcon,
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
            type: Array,
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
        const defaultImage = 'https://ionicframework.com/docs/img/demos/card-media.png'
        return {
            defaultImage
        }
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
                    <ion-row class="ion-text-start">
                        <ion-col size="1" class="position-col">
                            <ion-badge color="success" class="position-badge">
                                {{ (index + 1) }}ª
                            </ion-badge>
                        </ion-col>
                        <ion-col size="1">
                            <img :src="artist?.images[0]?.url ?? defaultImage"
                                 alt="album cover">
                        </ion-col>
                        <ion-col size="9">
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-label class="track-name">
                                            {{ artist?.name ?? 'Desconhecido' }}
                                        </ion-label>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-text>
                                            <!-- todo formatar número -->
                                            Seguidores: {{ artist?.followers?.total ?? 'Desconhecido' }}
                                        </ion-text>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-col>
                        <ion-col size="1" class="position-col">
                            <a :href="artist?.external_urls?.spotify ?? 'https://open.spotify.com/'"
                               target="_blank"
                               class="play-icon">
                                <ion-icon name="play-circle-outline" color="success"/>
                            </a>
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
}
.play-icon {
    font-size: 3em;
}
</style>
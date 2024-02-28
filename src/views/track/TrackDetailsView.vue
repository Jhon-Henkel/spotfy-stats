<script setup lang="ts">
import {useRoute} from "vue-router";
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";
import SpotifyTopTrackEntity from "@/services/spotify/topItems/TopTrackEntity";
import {IonCol, IonContent, IonGrid, IonLabel, IonRow, IonText, IonTitle, IonButton} from "@ionic/vue";
import router from "@/router";

const route = useRoute()
const id = route.params.id
const topItensService = new SpotifyTopItemsService()
const track: SpotifyTopTrackEntity|null = topItensService.getTrackById(id.toString())

</script>

<template>
    <ion-content>
        <div v-if="! track">
            <h1 class="ion-text-center">Música não encontrada</h1>
        </div>
        <div class="ion-text-center">
            <img :src="track?.albumImageUrl" :alt="track?.name + ' image'" />
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-title color="success" class="ion-padding-top">
                            {{ track?.name }}
                        </ion-title>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-padding-top">
                    <ion-col class="ion-padding-top">
                        <ion-text>
                            <ion-label>
                                Artista:
                            </ion-label>
                            <ion-label color="success">
                                <strong>
                                    <a :href="track?.artistUrl" target="_blank" class="link">
                                        {{ track?.artist }}
                                    </a>
                                </strong>
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-text>
                            <ion-label>
                                Albúm:
                            </ion-label>
                            <ion-label color="success">
                                <strong>
                                    <a :href="track?.albumUrl" target="_blank" class="link">
                                        {{ track?.albumName }}
                                    </a>
                                </strong>
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-text>
                            <ion-label>
                                Lançamento:
                            </ion-label>
                            <ion-label color="success">
                                <strong>{{ track?.albumReleaseDate }}</strong>
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-text>
                            <ion-label color="success">
                                <strong>{{ track?.popularity }} / 100 </strong>
                            </ion-label>
                            <ion-label>
                                popularidade
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row v-if="track.previewUrl !== null">
                    <ion-col>
                        <!-- todo imagem de fundo está preta e o player não ocupa 100% do preenchimento horizontal-->
                        <iframe :src="track?.previewUrl"
                                height="80"
                                class="iframe"
                                allowtransparency="true"
                                allow="encrypted-media" />
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button color="success" expand="block" :href="track?.externalUrl" target="_blank">
                            Abrir no Spotify
                        </ion-button>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button color="success" expand="block" @click="router.push({name: 'Home'})">
                            Voltar
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </div>
    </ion-content>
</template>

<style scoped>
    .link {
        color: var(--ion-color-success);
        text-decoration: none;
    }
    .iframe {
        border: 0;
        width: 100%;
        backface-visibility: hidden;
    }
</style>
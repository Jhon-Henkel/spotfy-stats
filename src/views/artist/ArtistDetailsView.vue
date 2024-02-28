<script setup lang="ts">
import {IonContent, IonTitle, IonCol, IonRow, IonGrid, IonText, IonLabel} from "@ionic/vue";
import {useRoute} from "vue-router";
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";
import SpotifyTopArtistEntity from "@/services/spotify/topItems/TopArtistEntity";
import router from "@/router";

const route = useRoute()
const id = route.params.id

const topItensService = new SpotifyTopItemsService()
const artist: SpotifyTopArtistEntity|null = topItensService.getArtistById(id.toString())

</script>

<template>
    <ion-content>
        <div v-if="! artist">
            <h1 class="ion-text-center">Artista não encontrado</h1>
        </div>
        <div class="ion-text-center">
            <img :src="artist?.imageUrl" :alt="artist?.name + ' image'" />
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-title color="success" class="ion-padding-top">
                            {{ artist?.name }}
                        </ion-title>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-padding-top">
                    <ion-col class="ion-padding-top">
                        <ion-text>
                            <ion-label color="success">
                                <strong>{{ artist?.followers.toLocaleString() }}</strong>
                            </ion-label>
                            <ion-label>
                                seguidores
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-text>
                            <ion-label color="success">
                                <strong>{{ artist?.popularity }}/100 </strong>
                            </ion-label>
                            <ion-label>
                                popularidade
                            </ion-label>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button color="success" expand="block" :href="artist?.externalUrl" target="_blank">
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

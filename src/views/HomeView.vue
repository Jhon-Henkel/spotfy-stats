<script lang="ts">
import {IonAccordionGroup, IonLabel, IonSegment, IonSegmentButton} from "@ionic/vue";
import {ref} from "vue";
import {SpotifyTopItemsStore} from "@/services/spotify/topItems/topItemsStore";
import TopTracksAccordion from "@/components/track/TopTracksAccordion.vue";
import TopArtistsAccordion from "@/components/artist/TopArtistsAccordion.vue";
import SpotifyTopArtistEntity from "@/services/spotify/topItems/TopArtistEntity";
import SpotifyTopTrackEntity from "@/services/spotify/topItems/TopTrackEntity";

export default {
    components: {
        TopArtistsAccordion,
        IonAccordionGroup,
        TopTracksAccordion,
        IonLabel,
        IonSegmentButton,
        IonSegment,
    },
    setup() {
        interface SpotifyTopItems {
            [period: string]: SpotifyTopArtistEntity[] | SpotifyTopTrackEntity[];
        }

        const selectedPeriod = ref('allTime')
        const topItemsStorage = SpotifyTopItemsStore()
        const topArtists: SpotifyTopItems = topItemsStorage.getTopArtists()
        const topTracks: SpotifyTopItems = topItemsStorage.getTopTracks()

        function changePeriod(event: any) {
            selectedPeriod.value = event.detail.value;
        }

        return {
            selectedPeriod,
            changePeriod,
            topArtists,
            topTracks
        }
    }
}
</script>

<template>
    <ion-segment :value="selectedPeriod" color="success" @ionChange="changePeriod">
        <ion-segment-button value="allTime">
            <ion-label>
                Desde o Início
            </ion-label>
        </ion-segment-button>
        <ion-segment-button value="lastSixMonths">
            <ion-label>
                Últimos 6 Meses
            </ion-label>
        </ion-segment-button>
        <ion-segment-button value="lastFourWeeks">
            <ion-label>
                Últimas 4 Semanas
            </ion-label>
        </ion-segment-button>
    </ion-segment>
    <ion-accordion-group expand="inset">
        <top-tracks-accordion label="Top Músicas" position="first" :tracks="topTracks[selectedPeriod]" />
        <top-artists-accordion label="Top Artistas" position="second" :artists="topArtists[selectedPeriod]" />
    </ion-accordion-group>
</template>
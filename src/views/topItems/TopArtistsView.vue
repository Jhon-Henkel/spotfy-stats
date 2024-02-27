<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";
import AppPagesHeader from "@/components/header/AppPagesHeader.vue";
import {
    IonAccordionGroup,
    IonCol,
    IonGrid,
    IonRow,
} from "@ionic/vue";
import TopArtistsAccordion from "@/components/artist/TopArtistsAccordion.vue";

export default {
    components: {
        TopArtistsAccordion,
        IonAccordionGroup, IonRow, IonGrid, IonCol, AppPagesHeader},
    async setup() {
        const topItems = new SpotifyTopItemsService()
        const topArtistsAllTime = await topItems.getTopArtistsAllTime()
        const topArtistsLastSixMonths = await topItems.getTopArtistsLastSixMonths()
        const topArtistsLastFourWeeks = await topItems.getTopArtistsLastFourWeeks()

        return {
            topArtistsAllTime: topArtistsAllTime,
            topArtistsLastSixMonths: topArtistsLastSixMonths,
            topArtistsLastFourWeeks: topArtistsLastFourWeeks,
        }
    }
}
</script>

<template>
    <app-pages-header>Top Artistas</app-pages-header>
    <ion-grid>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10" class="ion-text-center">
                <ion-accordion-group expand="inset">
                    <top-artists-accordion position="first" label="Desde o início" :artists="topArtistsAllTime" />
                    <top-artists-accordion position="second" label="Últimos 6 meses" :artists="topArtistsLastSixMonths" />
                    <top-artists-accordion position="third" label="Últimas 4 semanas" :artists="topArtistsLastFourWeeks" />
                </ion-accordion-group>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>
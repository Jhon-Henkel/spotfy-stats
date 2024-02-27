<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";
import TopTracksAccordion from "@/components/track/TopTracksAccordion.vue";
import AppPagesHeader from "@/components/header/AppPagesHeader.vue";
import { IonAccordionGroup, IonCol, IonRow, IonGrid } from "@ionic/vue";

export default {
    components: {
        AppPagesHeader,
        TopTracksAccordion,
        IonAccordionGroup,
        IonCol,
        IonRow,
        IonGrid
    },
    async setup() {
        const topItems = new SpotifyTopItemsService()
        const topTracksAllTime = await topItems.getTopTracksAllTime()
        const topTracksLastSixMonths = await topItems.getTopTracksLastSixMonths()
        const topTracksLastFourWeeks = await topItems.getTopTracksLastFourWeeks()
        const defaultImage = 'https://ionicframework.com/docs/img/demos/card-media.png'
        return {
            topTracksAllTime: topTracksAllTime,
            topTracksLastSixMonths: topTracksLastSixMonths,
            topTracksLastFourWeeks: topTracksLastFourWeeks,
            defaultImage: defaultImage
        }
    }
}
</script>

<template>
    <app-pages-header>Top Músicas</app-pages-header>
    <ion-grid>
        <ion-row>
            <ion-col size="1" />
            <ion-col size="10" class="ion-text-center">
                <ion-accordion-group expand="inset">
                    <top-tracks-accordion :tracks="topTracksAllTime" position="first" label="Desde o início" />
                    <top-tracks-accordion :tracks="topTracksLastSixMonths" position="second" label="Últimos 6 meses" />
                    <top-tracks-accordion :tracks="topTracksLastFourWeeks" position="third" label="Últimas 4 semanas" />
                </ion-accordion-group>
            </ion-col>
            <ion-col size="1" />
        </ion-row>
    </ion-grid>
</template>
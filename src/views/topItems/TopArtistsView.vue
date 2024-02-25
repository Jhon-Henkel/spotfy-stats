<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";

export default {
    async setup() {
        const topItems = new SpotifyTopItemsService()
        const topArtistsAllTime = await topItems.getTopArtistsAllTime()
        const topArtistsLastSixMonths = await topItems.getTopArtistsLastSixMonths()
        const topArtistsLastFourWeeks = await topItems.getTopArtistsLastFourWeeks()
        return {
            topArtistsAllTime: topArtistsAllTime,
            topArtistsLastSixMonths: topArtistsLastSixMonths,
            topArtistsLastFourWeeks: topArtistsLastFourWeeks
        }
    }
}
</script>

<template>
    <div>
        <h1>Top Faixas (all time)</h1>
        <div v-for="(artist, index) in topArtistsAllTime" :key="index">
            Faixa {{ (index + 1) }}: {{ artist.name }}
        </div>
        <h1>Top Faixas (six months)</h1>
        <div v-for="(artist, index) in topArtistsLastSixMonths" :key="index">
            Faixa {{ (index + 1) }}: {{ artist.name }}
        </div>
        <h1>Top Faixas (four weeks)</h1>
        <div v-for="(artist, index) in topArtistsLastFourWeeks" :key="index">
            Faixa {{ (index + 1) }}: {{ artist.name }}
        </div>
    </div>
</template>
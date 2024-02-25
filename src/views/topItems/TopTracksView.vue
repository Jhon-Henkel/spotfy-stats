<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";

export default {
    async setup() {
        const topItems = new SpotifyTopItemsService()
        const topTracksAllTime = await topItems.getTopItemsAllTime()
        const topTracksLastSixMonths = await topItems.getTopItemsLastSixMonths()
        const topTracksLastFourWeeks = await topItems.getTopItemsLastFourWeeks()
        return {
            topTracksAllTime: topTracksAllTime,
            topTracksLastSixMonths: topTracksLastSixMonths,
            topTracksLastFourWeeks: topTracksLastFourWeeks
        }
    }
}
</script>

<template>
    <div>
        <h1>Top Faixas (all time)</h1>
        <div v-for="(track, index) in topTracksAllTime" :key="index" style="color: #ffffff">
            Faixa {{ (index + 1) }}: {{ track.name }}
        </div>
        <h1>Top Faixas (six months)</h1>
        <div v-for="(track, index) in topTracksLastSixMonths" :key="index" style="color: #ffffff">
            Faixa {{ (index + 1) }}: {{ track.name }}
        </div>
        <h1>Top Faixas (four weeks)</h1>
        <div v-for="(track, index) in topTracksLastFourWeeks" :key="index" style="color: #ffffff">
            Faixa {{ (index + 1) }}: {{ track.name }}
        </div>
    </div>
</template>

<style scoped>

</style>
<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";
import SpotifyTopItemsTimeRange from "@/services/spotify/topItems/topItemsTimeRangeEnum";

export default {
    async setup() {
        const stats = new SpotifyTopItemsService()
        const topTracksAllTime = await stats.getTrackStats(SpotifyTopItemsTimeRange.LONG_TERM)
        const topTracksLastSixMonths = await stats.getTrackStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        const topTracksLastFourWeeks = await stats.getTrackStats(SpotifyTopItemsTimeRange.SHORT_TERM)
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
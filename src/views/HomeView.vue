<script lang="ts">
import SpotifyTopItemsService from "@/services/spotify/topItems/topItemsService";

export default {
    async setup() {
        const stats = new SpotifyTopItemsService()
        const tracksStats = await stats.getTrackStats()
        const artistStats = await stats.getArtistStats()
        return {
            tracksStats: tracksStats,
            artistStats: artistStats
        }
    }
}
</script>

<template>
    <div>
        <h1>Top Faixas</h1>
        <div v-for="(track, index) in tracksStats" :key="index" style="color: #ffffff">
            Faixa {{ (index + 1) }}: {{ track.name }}
        </div>
        <h1>Top Artistas</h1>
        <div v-for="(artist, index) in artistStats" :key="index" style="color: #ffffff">
            Artista {{ (index + 1) }}: {{ artist.name }}
        </div>
    </div>
</template>
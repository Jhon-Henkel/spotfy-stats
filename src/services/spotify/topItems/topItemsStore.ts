import {defineStore} from "pinia";
import {ref} from "vue";
import StorageService from "@/services/storage/StorageService";

export const SpotifyTopItemsStore = defineStore('SpotifyTopItemsStore', () => {
    const storageService = new StorageService()
    const topTracksAllTime = ref(storageService.getStorageItem('top_tracks_all_time'))
    const topTracksSixMonths = ref(storageService.getStorageItem('top_tracks_six_months'))
    const topTracksFourWeeks = ref(storageService.getStorageItem('top_tracks_four_weeks'))
    const topArtistsAllTime = ref(storageService.getStorageItem('top_artists_all_time'))
    const topArtistsSixMonths = ref(storageService.getStorageItem('top_artists_six_months'))
    const topArtistsFourWeeks = ref(storageService.getStorageItem('top_artists_four_weeks'))

    function setTopTracksAllTime(tracks:any): void {
        storageService.setStorageItem('top_tracks_all_time', tracks, storageService.oneDayMs)
        topTracksAllTime.value = tracks
    }

    function setTopTracksSixMonths(tracks:any): void {
        storageService.setStorageItem('top_tracks_six_months', tracks, storageService.oneDayMs)
        topTracksSixMonths.value = tracks
    }

    function setTopTracksFourWeeks(tracks:any): void {
        storageService.setStorageItem('top_tracks_four_weeks', tracks, storageService.oneDayMs)
        topTracksFourWeeks.value = tracks
    }

    function setTopArtistsAllTime(artists:any): void {
        storageService.setStorageItem('top_artists_all_time', artists, storageService.oneDayMs)
        topArtistsAllTime.value = artists
    }

    function setTopArtistsSixMonths(artists:any): void {
        storageService.setStorageItem('top_artists_six_months', artists, storageService.oneDayMs)
        topArtistsSixMonths.value = artists
    }

    function setTopArtistsFourWeeks(artists:any): void {
        storageService.setStorageItem('top_artists_four_weeks', artists, storageService.oneDayMs)
        topArtistsFourWeeks.value = artists
    }

    function removeTopItems(): void {
        storageService.removeStorageItems(
            'top_tracks_all_time',
            'top_tracks_six_months',
            'top_tracks_four_weeks',
            'top_artists_all_time',
            'top_artists_six_months',
            'top_artists_four_weeks'
        )
        topTracksAllTime.value = null
    }

    return {
        topTracksAllTime,
        topTracksSixMonths,
        topTracksFourWeeks,
        topArtistsAllTime,
        topArtistsSixMonths,
        topArtistsFourWeeks,
        setTopTracksAllTime,
        setTopTracksSixMonths,
        setTopTracksFourWeeks,
        setTopArtistsAllTime,
        setTopArtistsSixMonths,
        setTopArtistsFourWeeks,
        removeTopItems
    }
})
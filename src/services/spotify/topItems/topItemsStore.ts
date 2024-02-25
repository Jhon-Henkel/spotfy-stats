import {defineStore} from "pinia";
import {ref} from "vue";
import StorageService from "@/services/storage/StorageService";

export const SpotifyTopItemsStore = defineStore('SpotifyTopItemsStore', () => {
    const storageService = new StorageService()
    const topTracksAllTime = ref(storageService.getStorageItem('top_tracks_all_time'))
    const topTracksSixMonths = ref(storageService.getStorageItem('top_tracks_six_months'))
    const topTracksFourWeeks = ref(storageService.getStorageItem('top_tracks_four_weeks'))

    function setTopItemsAllTime(tracks:any): void {
        storageService.setStorageItem('top_tracks_all_time', tracks, storageService.oneDayMs)
        topTracksAllTime.value = tracks
    }

    function setTopItemsSixMonths(tracks:any): void {
        storageService.setStorageItem('top_tracks_six_months', tracks, storageService.oneDayMs)
        topTracksSixMonths.value = tracks
    }

    function setTopItemsFourWeeks(tracks:any): void {
        storageService.setStorageItem('top_tracks_four_weeks', tracks, storageService.oneDayMs)
        topTracksFourWeeks.value = tracks
    }

    function removeTopItems(): void {
        storageService.removeStorageItems('top_tracks_all_time', 'top_tracks_six_months', 'top_tracks_four_weeks')
        topTracksAllTime.value = null
    }

    return {
        topTracksAllTime,
        topTracksSixMonths,
        topTracksFourWeeks,
        setTopItemsAllTime,
        setTopItemsSixMonths,
        setTopItemsFourWeeks,
        removeTopItems
    }
})
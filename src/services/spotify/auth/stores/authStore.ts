import {defineStore} from "pinia";
import {ref} from "vue";
import StorageService from "@/services/storage/StorageService";

export const SpotifyAuthStore = defineStore('SpotifyAuthStore', () => {
    const storageService = new StorageService()
    const accessToken = ref(storageService.getStorageItem('access_token'))
    const refreshToken = ref(storageService.getStorageItem('refresh_token'))

    function setAccessToken(token:string): void {
        storageService.setStorageItem('access_token', token, null)
        accessToken.value = token
    }

    function setRefreshToken(refresh:string): void {
        storageService.setStorageItem('refresh_token', refresh, null)
        refreshToken.value = refresh
    }

    function removeToken(): void {
        storageService.removeStorageItems('access_token', 'refresh_token')
        accessToken.value = ''
        refreshToken.value = ''
    }

    return { accessToken, refreshToken, setRefreshToken, setAccessToken, removeToken }
})

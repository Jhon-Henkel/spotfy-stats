import {defineStore} from "pinia";
import {ref} from "vue";
import StorageService from "@/services/storage/StorageService";

export const SpotifyAuthStore = defineStore('SpotifyAuthStore', () => {
    const storageService = new StorageService()
    const accessToken = ref(storageService.getStorageItem('access_token'))
    const refreshToken = ref(storageService.getStorageItem('refresh_token'))
    const state: string = manageState()

    function manageState(): string {
        let state = storageService.getStorageItem('state')
        if (state) {
            return state
        }
        state = Math.random().toString(36)
        storageService.setStorageItem('state', state, null)
        return state
    }

    function setAccessToken(token:string): void {
        storageService.removeStorageItems('state')
        storageService.setStorageItem('access_token', token, null)
        accessToken.value = token
    }

    function setRefreshToken(refresh:string): void {
        storageService.setStorageItem('refresh_token', refresh, null)
        refreshToken.value = refresh
    }

    function removeToken(): void {
        storageService.removeStorageItems('access_token', 'refresh_token', 'state')
        accessToken.value = ''
        refreshToken.value = ''
    }

    return { accessToken, refreshToken, state, setRefreshToken, setAccessToken, removeToken }
})

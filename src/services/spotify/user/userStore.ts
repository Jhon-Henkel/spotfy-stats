import {defineStore} from "pinia";
import {ref} from "vue";
import StorageService from "@/services/storage/StorageService";

export const SpotifyUserStore = defineStore('SpotifyUserStore', () => {
    const storageService = new StorageService()
    const userProfile = ref(storageService.getStorageItem('user_profile'))

    function setUserProfile(user:any): void {
        storageService.setStorageItem('user_profile', user, storageService.oneWeekMs)
        userProfile.value = user
    }

    function removeUserProfile(): void {
        storageService.removeStorageItems('user_profile')
        userProfile.value = null
    }

    return {
        userProfile,
        setUserProfile,
        removeUserProfile
    }
})
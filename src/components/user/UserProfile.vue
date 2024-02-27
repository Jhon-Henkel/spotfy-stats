<script lang="ts">
import {IonChip, IonAvatar, IonLabel} from "@ionic/vue";
import SpotifyUserService from "@/services/spotify/user/userService";
import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import {ref} from "vue";
import SpotifyUserEntity from "@/services/spotify/user/userEntity";

export default {
    components: {
        IonChip,
        IonAvatar,
        IonLabel
    },
    async setup() {
        const userServices = new SpotifyUserService()
        let user = new SpotifyUserEntity(null, null, null)


        const store = SpotifyAuthStore()
        const isSync: boolean = !!ref(store.accessToken).value
        if (isSync) {
            user = await userServices.getUserProfile().then((response) => {
                return response
            })
        }

        return {
            user: user,
        }
    },
    methods: {
        openUserProfile() {
            window.open(this.user.profileUrl, '_blank')
        }
    }
}
</script>

<template>
    <ion-chip @click="openUserProfile">
        <ion-avatar>
            <img alt="profile picture" :src="user.image" />
        </ion-avatar>
        <ion-label>{{ user.name }}</ion-label>
    </ion-chip>
</template>

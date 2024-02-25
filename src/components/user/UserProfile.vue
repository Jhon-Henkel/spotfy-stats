<script lang="ts">
import {IonChip, IonAvatar, IonLabel} from "@ionic/vue";
import SpotifyUserService from "@/services/spotify/user/userService";
import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import {ref} from "vue";

export default {
    components: {
        IonChip,
        IonAvatar,
        IonLabel
    },
    async setup() {
        const userServices = new SpotifyUserService()
        let user = {
            display_name: 'Usuário',
            images: [
                {
                    url: 'https://ionicframework.com/docs/img/demos/avatar.svg'
                }
            ],
            external_urls: {
                spotify: 'https://open.spotify.com'
            }
        }


        const store = SpotifyAuthStore()
        const isSync: boolean = !!ref(store.accessToken).value
        if (isSync) {
            user = await userServices.getUserProfile().then((response) => {
                return response
            })
        }

        const profileImage = user?.images[0]?.url ?? 'https://ionicframework.com/docs/img/demos/avatar.svg'

        return {
            user: user,
            profileImage: profileImage
        }
    },
    methods: {
        openUserProfile() {
            window.open(this.user.external_urls.spotify, '_blank')
        }
    }
}
</script>

<template>
    <ion-chip @click="openUserProfile">
        <ion-avatar>
            <img alt="profile picture" :src="profileImage" />
        </ion-avatar>
        <ion-label>{{ user.display_name }}</ion-label>
    </ion-chip>
</template>

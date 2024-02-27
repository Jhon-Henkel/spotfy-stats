import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import {SpotifyUserStore} from "@/services/spotify/user/userStore";
import SpotifyUserEntity from "@/services/spotify/user/userEntity";

export default class SpotifyUserService {
    private spotifyBaseUri: string = process.env.VITE_SPOTIFY_API_URL ?? '';
    private authStore = SpotifyAuthStore();
    private userStore = SpotifyUserStore();
    private requestParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authStore.accessToken}`,
        },
    }

    private async requestUserProfile(): Promise<SpotifyUserEntity> {
        return await fetch(`${this.spotifyBaseUri}/me`, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            const image = data?.images[0]?.url ?? 'https://ionicframework.com/docs/img/demos/avatar.svg'
            return new SpotifyUserEntity(data.display_name, image, data.external_urls.spotify)
        });
    }

    public async getUserProfile(): Promise<SpotifyUserEntity> {
        let user = this.userStore.userProfile
        if (user) {
            return user
        }
        user = await this.requestUserProfile()
        this.userStore.setUserProfile(user)
        return user
    }
}
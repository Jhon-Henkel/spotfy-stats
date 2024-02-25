import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import {SpotifyUserStore} from "@/services/spotify/user/userStore";

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

    private async requestUserProfile(): Promise<any> {
        return await fetch(`${this.spotifyBaseUri}/me`, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data
        });
    }

    public async getUserProfile(): Promise<any> {
        let user = this.userStore.userProfile
        if (user) {
            return user
        }
        user = await this.requestUserProfile()
        this.userStore.setUserProfile(user)
        return user
    }
}
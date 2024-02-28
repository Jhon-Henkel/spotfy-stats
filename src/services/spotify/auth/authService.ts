import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import {SpotifyUserStore} from "@/services/spotify/user/userStore";
import {ref} from "vue";

export default class SpotifyAuthService {
    private clientId: string|undefined = process.env.VITE_SPOTIFY_CLIENT_ID;
    private redirectUrl: string = process.env.VITE_SPOTIFY_REDIRECT_URI || '';
    private clientSecret: string|undefined = process.env.VITE_SPOTIFY_CLIENT_SECRET;
    private spotifyToken: string = btoa(`${this.clientId}:${this.clientSecret}`);
    private scope: string = 'user-top-read%20user-read-private%20user-read-email';
    private spotifyBaseUri: string = 'https://accounts.spotify.com';
    private authStore = SpotifyAuthStore();

    public async requestAndSavedToken(code: string): Promise<boolean> {
        const authParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${this.spotifyToken}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                redirect_uri: this.redirectUrl,
                code: code,
            }),
        }

        return fetch(`${this.spotifyBaseUri}/api/token`, authParams).then(
            (result) => result.json()
        ).then((data): boolean => {
            if (data.error) {
              return false;
            }
            this.authStore.setAccessToken(data.access_token);
            this.authStore.setRefreshToken(data.refresh_token);
            return true;
        });
    }

    public async requestAndSavedRefreshToken(refreshToken: string): Promise<boolean> {
        const refreshParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${this.spotifyToken}`,
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: this.clientId ?? '',
            }),
        }
        return fetch(`${this.spotifyBaseUri}/api/token`, refreshParams).then(
            (res) => res.json()
        ).then((data) => {
            console.log(data);
            return true;
        });
    }

    public getUrlRequestCode(): string {
        return `${this.spotifyBaseUri}/authorize?client_id=${this.clientId}&response_type=code` +
        `&redirect_uri=${this.redirectUrl}&scope=${this.scope}&state=${this.authStore.state}`
    }

    public isValidateState(state: string): boolean {
        return state === this.authStore.state;
    }

    public removeToken(): void {
        this.authStore.removeToken();
    }

    public mustRequestSpotifyLogin(): boolean {
        const user = ref(SpotifyUserStore().userProfile)
        const accessToken = ref(this.authStore.accessToken)
        return user.value === null && accessToken.value === null;
    }
}
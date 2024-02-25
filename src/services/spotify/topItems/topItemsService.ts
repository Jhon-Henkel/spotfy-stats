import {SpotifyAuthStore} from "@/services/spotify/auth/stores/authStore";

export default class SpotifyTopItemsService {
    private spotifyBaseUri: string = 'https://api.spotify.com/v1';
    private authStore = SpotifyAuthStore();
    private requestParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authStore.accessToken}`,
        },
    }

    public async getTrackStats(): Promise<any> {
        return await fetch(`${this.spotifyBaseUri}/me/top/tracks?time_range=long_term&limit=10`, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items;
        });
    }

    public async getArtistStats(): Promise<any> {
        return await fetch(`${this.spotifyBaseUri}/me/top/artists?time_range=long_term&limit=10`, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items;
        });
    }
}


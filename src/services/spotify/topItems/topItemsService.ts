import {SpotifyAuthStore} from "@/services/spotify/auth/stores/authStore";
import SpotifyTopItemsTimeRange from "@/services/spotify/topItems/topItemsTimeRangeEnum";

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

    public async getTrackStats(timeRange: SpotifyTopItemsTimeRange): Promise<any> {
        const url = `${this.spotifyBaseUri}/me/top/tracks?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items
        });
    }

    public async getArtistStats(timeRange: SpotifyTopItemsTimeRange): Promise<any> {
        const url = `${this.spotifyBaseUri}/me/top/artists?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items
        });
    }
}


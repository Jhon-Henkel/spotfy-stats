import {SpotifyAuthStore} from "@/services/spotify/auth/stores/authStore";
import SpotifyTopItemsTimeRange from "@/services/spotify/topItems/topItemsTimeRangeEnum";
import {SpotifyTopItemsStore} from "@/services/spotify/topItems/topItemsStore";

export default class SpotifyTopItemsService {
    private spotifyBaseUri: string = 'https://api.spotify.com/v1';
    private authStore = SpotifyAuthStore();
    private topItemsStore = SpotifyTopItemsStore();
    private requestParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authStore.accessToken}`,
        },
    }

    private async getTrackStats(timeRange: SpotifyTopItemsTimeRange): Promise<any> {
        const url = `${this.spotifyBaseUri}/me/top/tracks?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items
        });
    }

    public async getTopItemsAllTime(): Promise<any> {
        let tracks = this.topItemsStore.topTracksAllTime
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.LONG_TERM)
        this.topItemsStore.setTopItemsAllTime(tracks)
        return tracks
    }

    public async getTopItemsLastSixMonths(): Promise<any> {
        let tracks = this.topItemsStore.topTracksSixMonths
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        this.topItemsStore.setTopItemsSixMonths(tracks)
        return tracks
    }

    public async getTopItemsLastFourWeeks(): Promise<any> {
        let tracks = this.topItemsStore.topTracksFourWeeks
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.SHORT_TERM)
        this.topItemsStore.setTopItemsFourWeeks(tracks)
        return tracks
    }

    private async getArtistStats(timeRange: SpotifyTopItemsTimeRange): Promise<any> {
        const url = `${this.spotifyBaseUri}/me/top/artists?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result) => result.json()
        ).then((data) => {
            return data.items
        });
    }
}

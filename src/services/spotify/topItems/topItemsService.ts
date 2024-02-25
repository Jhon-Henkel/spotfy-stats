import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
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

    public async getTopTracksAllTime(): Promise<any> {
        let tracks = this.topItemsStore.topTracksAllTime
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.LONG_TERM)
        this.topItemsStore.setTopTracksAllTime(tracks)
        return tracks
    }

    public async getTopTracksLastSixMonths(): Promise<any> {
        let tracks = this.topItemsStore.topTracksSixMonths
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        this.topItemsStore.setTopTracksSixMonths(tracks)
        return tracks
    }

    public async getTopTracksLastFourWeeks(): Promise<any> {
        let tracks = this.topItemsStore.topTracksFourWeeks
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.SHORT_TERM)
        this.topItemsStore.setTopTracksFourWeeks(tracks)
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

    public async getTopArtistsAllTime(): Promise<any> {
        let artists = this.topItemsStore.topArtistsAllTime
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.LONG_TERM)
        this.topItemsStore.setTopArtistsAllTime(artists)
        return artists
    }

    public async getTopArtistsLastSixMonths(): Promise<any> {
        let artists = this.topItemsStore.topArtistsSixMonths
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        this.topItemsStore.setTopArtistsSixMonths(artists)
        return artists
    }

    public async getTopArtistsLastFourWeeks(): Promise<any> {
        let artists = this.topItemsStore.topArtistsFourWeeks
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.SHORT_TERM)
        this.topItemsStore.setTopArtistsFourWeeks(artists)
        return artists
    }
}

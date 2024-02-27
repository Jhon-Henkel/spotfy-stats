import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import SpotifyTopItemsTimeRange from "@/services/spotify/topItems/topItemsTimeRangeEnum";
import {SpotifyTopItemsStore} from "@/services/spotify/topItems/topItemsStore";
import SpotifyTopTrackEntity from "@/services/spotify/topItems/TopTrackEntity";

export default class SpotifyTopItemsService {
    private spotifyBaseUri: string = process.env.VITE_SPOTIFY_API_URL ?? '';
    private authStore = SpotifyAuthStore();
    private topItemsStore = SpotifyTopItemsStore();
    private requestParams = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authStore.accessToken}`,
        },
    }

    private async getTrackStats(timeRange: SpotifyTopItemsTimeRange): Promise<Array<SpotifyTopTrackEntity>> {
        const url: string = `${this.spotifyBaseUri}/me/top/tracks?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result: Response) => result.json()
        ).then((data) => {
            const tracks: Array<SpotifyTopTrackEntity> = []
            data.items.forEach((item: any) => {
                const track = new SpotifyTopTrackEntity(
                    item?.album?.images[0]?.url ?? null,
                    item.name,
                    item?.artists[0]?.name ?? null,
                    item?.external_urls?.spotify ?? null
                )
                tracks.push(track)
            })
            return tracks
        });
    }

    public async getTopTracksAllTime(): Promise<Array<SpotifyTopTrackEntity>> {
        let tracks = this.topItemsStore.topTracksAllTime
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.LONG_TERM)
        this.topItemsStore.setTopTracksAllTime(tracks)
        return tracks
    }

    public async getTopTracksLastSixMonths(): Promise<Array<SpotifyTopTrackEntity>> {
        let tracks = this.topItemsStore.topTracksSixMonths
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        this.topItemsStore.setTopTracksSixMonths(tracks)
        return tracks
    }

    public async getTopTracksLastFourWeeks(): Promise<Array<SpotifyTopTrackEntity>> {
        let tracks = this.topItemsStore.topTracksFourWeeks
        if (tracks) {
            return tracks
        }
        tracks = await this.getTrackStats(SpotifyTopItemsTimeRange.SHORT_TERM)
        this.topItemsStore.setTopTracksFourWeeks(tracks)
        return tracks
    }

    private async getArtistStats(timeRange: SpotifyTopItemsTimeRange): Promise<any> {
        const url: string = `${this.spotifyBaseUri}/me/top/artists?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result: Response) => result.json()
        ).then((data) => {
            // todo salvar em um novo objeto com somente os dados necessários
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

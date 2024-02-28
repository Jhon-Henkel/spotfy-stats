import {SpotifyAuthStore} from "@/services/spotify/auth/authStore";
import SpotifyTopItemsTimeRange from "@/services/spotify/topItems/topItemsTimeRangeEnum";
import {SpotifyTopItemsStore} from "@/services/spotify/topItems/topItemsStore";
import SpotifyTopTrackEntity from "@/services/spotify/topItems/TopTrackEntity";
import SpotifyTopArtistEntity from "@/services/spotify/topItems/TopArtistEntity";

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
                    item?.external_urls?.spotify ?? null,
                    item.id,
                    item?.album?.name ?? null,
                    item?.album?.external_urls?.spotify ?? null,
                    item?.album?.release_date ?? null,
                    item?.artists[0]?.external_urls?.spotify ?? null,
                    item.popularity,
                    item.preview_url
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

    public getTrackById(id: string): SpotifyTopTrackEntity | null {
        const allTracks = this.topItemsStore.getTopTracks()
        const allTime = allTracks.allTime
        const sixMonths = allTracks.lastSixMonths
        const fourWeeks = allTracks.lastFourWeeks
        let track = allTime.find((track) => track.id === id)
        if (track) {
            return track
        }
        track = sixMonths.find((track) => track.id === id)
        if (track) {
            return track
        }
        track = fourWeeks.find((track) => track.id === id)
        if (track) {
            return track
        }
        return null
    }

    private async getArtistStats(timeRange: SpotifyTopItemsTimeRange): Promise<Array<SpotifyTopArtistEntity>> {
        const url: string = `${this.spotifyBaseUri}/me/top/artists?time_range=${timeRange.toString()}&limit=10`
        return await fetch(url, this.requestParams).then(
            (result: Response) => result.json()
        ).then((data) => {
            const artists: Array<SpotifyTopArtistEntity> = []
            data.items.forEach((item: any) => {
                const artist = new SpotifyTopArtistEntity(
                    item?.images[0]?.url ?? null,
                    item.name,
                    item?.external_urls?.spotify ?? null,
                    item.followers.total,
                    item.id,
                    item.popularity
                )
                artists.push(artist)
            })
            return artists
        });
    }

    public async getTopArtistsAllTime(): Promise<Array<SpotifyTopArtistEntity>> {
        let artists = this.topItemsStore.topArtistsAllTime
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.LONG_TERM)
        this.topItemsStore.setTopArtistsAllTime(artists)
        return artists
    }

    public async getTopArtistsLastSixMonths(): Promise<Array<SpotifyTopArtistEntity>> {
        let artists = this.topItemsStore.topArtistsSixMonths
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.MEDIUM_TERM)
        this.topItemsStore.setTopArtistsSixMonths(artists)
        return artists
    }

    public async getTopArtistsLastFourWeeks(): Promise<Array<SpotifyTopArtistEntity>> {
        let artists = this.topItemsStore.topArtistsFourWeeks
        if (artists) {
            return artists
        }
        artists = await this.getArtistStats(SpotifyTopItemsTimeRange.SHORT_TERM)
        this.topItemsStore.setTopArtistsFourWeeks(artists)
        return artists
    }

    public getArtistById(id: string): SpotifyTopArtistEntity | null {
        const allArtists = this.topItemsStore.getTopArtists()
        const allTime = allArtists.allTime
        const sixMonths = allArtists.lastSixMonths
        const fourWeeks = allArtists.lastFourWeeks
        let artist = allTime.find((artist) => artist.id === id)
        if (artist) {
            return artist
        }
        artist = sixMonths.find((artist) => artist.id === id)
        if (artist) {
            return artist
        }
        artist = fourWeeks.find((artist) => artist.id === id)
        if (artist) {
            return artist
        }
        return null
    }
}

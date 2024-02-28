export default class SpotifyTopTrackEntity {
    public id: string = ''
    public albumImageUrl: string = 'https://ionicframework.com/docs/img/demos/card-media.png'
    public name: string = 'Desconhecido'
    public artist: string = 'Desconhecido'
    public externalUrl: string = 'https://open.spotify.com'
    public albumName: string = 'Desconhecido'
    public albumUrl: string = 'https://open.spotify.com'
    public albumReleaseDate: string = 'Desconhecido'
    public artistUrl: string = 'https://open.spotify.com'
    public popularity: number = 0
    public previewUrl: null|string = null

    constructor(
        albumImageUrl: null|string,
        name: null|string,
        artist: null|string,
        externalUrl: null|string,
        id: string,
        albumName: null|string,
        albumUrl: null|string,
        albumReleaseDate: null|string,
        artistUrl: null|string,
        popularity: number,
        previewUrl: null|string
    ) {
        if (albumImageUrl !== null) {
            this.albumImageUrl = albumImageUrl
        }
        if (name !== null) {
            this.name = name
        }
        if (artist !== null) {
            this.artist = artist
        }
        if (externalUrl !== null) {
            this.externalUrl = externalUrl
        }
        if (albumName !== null) {
            this.albumName = albumName
        }
        if (albumUrl !== null) {
            this.albumUrl = albumUrl
        }
        if (albumReleaseDate !== null) {
            this.albumReleaseDate = new Date(albumReleaseDate).getFullYear().toString()
        }
        if (artistUrl !== null) {
            this.artistUrl = artistUrl
        }
        if (previewUrl !== null) {
            this.previewUrl = previewUrl
        }
        this.popularity = popularity
        this.id = id
    }
}
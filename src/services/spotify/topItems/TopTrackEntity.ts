export default class SpotifyTopTrackEntity {
    public albumImageUrl: string = 'https://ionicframework.com/docs/img/demos/card-media.png'
    public name: string = 'Desconhecido'
    public artist: string = 'Desconhecido'
    public externalUrl: string = 'https://open.spotify.com'

    constructor(albumImageUrl: null|string, name: null|string, artist: null|string, externalUrl: null|string) {
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
    }
}
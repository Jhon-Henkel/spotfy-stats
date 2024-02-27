export default class SpotifyTopArtistEntity {
    public id: number = 0
    public imageUrl: string = 'https://ionicframework.com/docs/img/demos/card-media.png'
    public name: string = 'Desconhecido'
    public externalUrl: string = 'https://open.spotify.com'
    public followers: number = 0

    constructor(imageUrl: null|string, name: null|string, externalUrl: null|string, followers: number, id: number) {
        if (imageUrl !== null) {
            this.imageUrl = imageUrl
        }
        if (name !== null) {
            this.name = name
        }
        if (externalUrl !== null) {
            this.externalUrl = externalUrl
        }
        if (followers !== 0) {
            this.followers = followers
        }
        if (id !== 0) {
            this.id = id
        }
    }
}
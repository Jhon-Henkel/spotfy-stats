export default class SpotifyUserEntity {
    public name: string = 'Usuário'
    public image: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'
    public profileUrl: string = 'https://open.spotify.com'

    constructor(name: null|string, image: null|string, profileUrl: null|string) {
        if (name !== null) {
            this.name = name
        }
        if (image !== null) {
            this.image = image
        }
        if (profileUrl !== null) {
            this.profileUrl = profileUrl
        }
    }
}
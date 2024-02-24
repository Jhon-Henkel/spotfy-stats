export default class SpotifyAuthService {
    private clientId: string|undefined = process.env.VITE_SPOTIFY_CLIENT_ID;
    private redirectUrl: string = process.env.VITE_SPOTIFY_REDIRECT_URI || '';
    private clientSecret: string|undefined = process.env.VITE_SPOTIFY_CLIENT_SECRET;
    private spotifyToken: string = btoa(`${this.clientId}:${this.clientSecret}`);
    private scope: string = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
    private spotifyBaseUri: string = 'https://accounts.spotify.com';

    public async requestAndSavedToken(code: string): Promise<boolean> {
        const authParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${this.spotifyToken}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                redirect_uri: this.redirectUrl,
                code: code,
            }),
        }

        return fetch(`${this.spotifyBaseUri}/api/token`, authParams).then(
            (result) => result.json()
        ).then((data): boolean => {
            if (data.error) {
              return false;
            }
            // todo salvar o data no store
            console.log(data);
            return true;
        });
    }

    public async requestAndSavedRefreshToken(refreshToken: string): Promise<boolean> {
        const refreshParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${this.spotifyToken}`,
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: this.clientId ?? '',
            }),
        }
        return fetch(`${this.spotifyBaseUri}/api/token`, refreshParams).then(
            (res) => res.json()
        ).then((data) => {
            // todo salvar o data no store
            console.log(data);
            return true;
        });
    }

    public getUrlRequestCode(): string {
        // todo gerar um state dinâmico talvez tenha que ser gerado no store
        return `${this.spotifyBaseUri}/authorize?client_id=${this.clientId}&response_type=code` +
        `&redirect_uri=${this.redirectUrl}&scope=${this.scope}&state=34fFs29kd09`
    }

    public validateState(state: string): boolean {
        // todo validar o state
        console.log(state);
        return true;
    }
}
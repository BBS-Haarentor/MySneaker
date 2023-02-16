export default class Game {
    constructor(myHeaders) {
        this.myHeaders = myHeaders;
        this.urlencoded = new URLSearchParams();

        this.requestOptions = {
            method: 'GET',
            headers: this.myHeaders,
            body: this.urlencoded,
            redirect: 'follow'
        };
    }
}
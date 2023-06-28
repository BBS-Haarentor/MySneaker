export class RequestException implements Error {
    constructor(message) {
        this.message = message
    }
}
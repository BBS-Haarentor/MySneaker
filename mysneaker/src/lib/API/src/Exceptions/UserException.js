export class UserException implements Error {
    constructor(message) {
        this.message = message
    }
}
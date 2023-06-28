export class MissingArgumentsException implements Error {
    constructor(message) {
        this.message = message
    }
}
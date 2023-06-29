export class NewEntryException implements Error {
    constructor(message) {
        this.message = message
    }
}
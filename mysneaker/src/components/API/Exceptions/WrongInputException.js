export class WrongInputException implements Error {
    constructor(message) {
        this.message = message
    }
}
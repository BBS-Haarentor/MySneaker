export default class Cycle {
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

    /**
     * Create new Entry with API Request
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} body - JSON stringify body for Request
     * @param {Boolean} isTeacher - Request for Teacher or for user
     * @return async {String|MissingArgumentsException|WrongInputException} Access token or MissingArgumentsException / WrongInputException
     */
    async newEntry(body, isTeacher) {
        this.requestOptions.body = body;
        this.requestOptions.method = "POST";
        return await fetch(process.env.REACT_APP_MY_API_URL + '/api/v1/cycle/' + (isTeacher ? "teacher/new_entry" : "new_entry"), this.requestOptions).then(async res => {
            if(res.status === 201) {
                return true;
            } else {
                return await res.json()
            }
        })
    }
}
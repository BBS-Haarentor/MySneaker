import {MissingArgumentsException} from "../Exceptions/MissingArgumentsException";
import {UserException} from "../Exceptions/UserException";
import {WrongInputException} from "../Exceptions/WrongInputException";

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

    /**
     * Turnover Test Methode with API Request
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} gameId - Game ID from the game
     * @param {String} index - Index from check turnover
     * @return async {String|MissingArgumentsException|WrongInputException} Access token or MissingArgumentsException / WrongInputException
     */
    async turnover_sim(gameId, index) {
        if (gameId === "" || index === "") {
            throw new MissingArgumentsException("Bitte gebe keine Leeren Felder ab")
        }

        this.requestOptions.body = null;

        return fetch(process.env.REACT_APP_MY_API_URL + `/api/v1/game/turnover_sim/${gameId}/index/${index}`, this.requestOptions).then(async res => {
            if (res.status === 200) {
                return await res.json();
            } else {
                throw new MissingArgumentsException("Es gibt ein Problem bei der Anfrage")
            }
        })
    }

}
import {MissingArgumentsException} from "../Exceptions/MissingArgumentsException";

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
     * Create a game API Request
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} grade_name - Game name
     * @param {String[]} scenario_order - Scenario order
     * @return async {Object|MissingArgumentsException} Object with Data or MissingArgumentsException
     */
    async create(grade_name, scenario_order: String[]) {
        if (grade_name === "" || scenario_order === "") {
            throw new MissingArgumentsException("Bitte gebe keine Leeren Felder ab")
        }

        ["" + grade_name]()

        this.requestOptions.method = "POST";
        this.requestOptions.body = JSON.stringify({
            "grade_name": grade_name,
            "is_active": true,
            "scenario_order": scenario_order,
            "signup_enabled": false
        });

        return fetch(process.env.REACT_APP_MY_API_URL + `/api/v1/game/create`, this.requestOptions).then(async res => {
            return {
                error: res.status !== 201,
                data: await res.json()
            }
        })
    }

    /**
     * Get finished data
     * @author Optischa <fabian.evers2602@gmail.com>
     * @return async {Object|MissingArgumentsException} Object with Data
     */
    async getFinishedDataForStudent() {
        this.requestOptions.method = "GET";
        this.requestOptions.body = null;

        return fetch(process.env.REACT_APP_MY_API_URL + `/api/v1/game/student/finished`, this.requestOptions).then(async res => {
            return {
                error: res.status !== 200,
                data: await res.json()
            }
        })
    }

    /**
     * Get leaderboard for teacher
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} game_id - Game name
     * @return async {Object|MissingArgumentsException} Object with Data
     */
    async getLeaderboard(game_id) {
        this.requestOptions.method = "GET";
        this.requestOptions.body = null;

        return fetch(process.env.REACT_APP_MY_API_URL + `/api/v1/game/teacher/leaderboard/${game_id}`, this.requestOptions).then(async res => {
            return {
                error: res.status !== 200,
                data: await res.json()
            }
        })
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
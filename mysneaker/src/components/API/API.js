import {MissingArgumentsException} from "./Exceptions/MissingArgumentsException";
import {WrongInputException} from "./Exceptions/WrongInputException";

export class User {
    constructor() {
        this.myHeaders = new Headers();
        this.myHeaders.append('Access-Control-Allow-Origin', '*')

        this.urlencoded = new URLSearchParams();

        this.requestOptions = {
            method: 'GET',
            headers: this.myHeaders,
            body: this.urlencoded,
            redirect: 'follow'
        };
    }

    /**
     * Login Methode with API Request
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} userName - Login Username
     * @param {String} password - Login Password
     * @return async {String|MissingArgumentsException|WrongInputException} Access token or MissingArgumentsException / WrongInputException
     */
    async login(userName, password) {
        if(userName === "" || password === ""){
            throw new MissingArgumentsException("Bitte gebe keine Leeren Felder ab")
        }
        this.urlencoded.append("username", userName);
        this.urlencoded.append("password", password);
        this.myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.requestOptions.method = "POST"
        return fetch(process.env.REACT_APP_MY_API_URL + "/user/login", this.requestOptions).then(async res => {
            if (res.status === 200) {
                return await res.json().then(async data => {
                    return await data.access_token;
                })
            } else if (res.status === 422) {
                throw new MissingArgumentsException("Bitte gebe keine Leeren Felder ab")
            } else {
                throw new WrongInputException("Falsches Passwort oder Benutzername")
            }
        })

    }
}
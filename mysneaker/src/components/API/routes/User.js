import {MissingArgumentsException} from "../Exceptions/MissingArgumentsException";
import {WrongInputException} from "../Exceptions/WrongInputException";
import {UserException} from "../Exceptions/UserException";

export default class User {
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
        const formdata = new FormData();
        formdata.append("username", userName);
        formdata.append("password", password);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        return fetch(process.env.REACT_APP_MY_API_URL + "/user/login", requestOptions).then(async res => {
            if (res.status === 200) {
                return await res.json().then(async data => {
                    return await data.access_token;
                })
            } else if (res.status === 422) {
                throw new MissingArgumentsException("Bitte gebe keine Leeren Felder ab")
            } else if(res.status === 409) {
                throw new UserException("Bitte gebe keine Leeren Felder ab")
            } else {
                throw new WrongInputException("Falsches Passwort oder Benutzername")
            }
        })
    }

    /**
     * Login Methode with API Request
     * @author Optischa <fabian.evers2602@gmail.com>
     * @param {String} userName - Login Username
     * @param {String} password - Login Password
     * @return async {String|MissingArgumentsException|WrongInputException} Access token or MissingArgumentsException / WrongInputException
     */
    async myAuth(userName, password) {
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
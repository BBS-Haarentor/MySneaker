import Cycle from "./routes/Cycle";
import User from "./routes/User";
import Game from "./routes/Game";
import Cookies from "js-cookie";


export default class API {
    constructor(auth=false) {
        const myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*')
        myHeaders.append("Content-Type", "application/json");
        if(auth) {
            myHeaders.append("Authorization", "Bearer " + Cookies.get("session"))
        }

        this._user = new User(myHeaders);
        this._cycle = new Cycle(myHeaders);
        this._game = new Game(myHeaders);
    }


    get game(): Game {
        return this._game;
    }

    get cycle(): Cycle {
        return this._cycle;
    }

    get user(): User {
        return this._user;
    }
}
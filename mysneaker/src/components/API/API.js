import Cycle from "./routes/Cycle";
import User from "./routes/User";
import Game from "./routes/Game";


export default class API {
    constructor(access_key=null) {
        const myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*')
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + access_key)

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
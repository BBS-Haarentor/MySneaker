import {configureStore} from '@reduxjs/toolkit';

import userSlice from "../slice/user/userSlice";
import gameSlice from '../slice/game/gameSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice,
    },
});

export default store;

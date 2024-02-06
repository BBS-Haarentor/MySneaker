import { configureStore } from '@reduxjs/toolkit';

import userSlice from "../slice/user/userSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
    },
});

export default store;

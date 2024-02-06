import {createSlice} from '@reduxjs/toolkit';

interface AppState {
    user: undefined;
}

const initialState: AppState = {
    user: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
});

export const {} = userSlice.actions;

export default userSlice.reducer;
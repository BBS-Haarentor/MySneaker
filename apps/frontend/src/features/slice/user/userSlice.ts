import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
    user: string;
}

const initialState: AppState = {
    user: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state: Draft<AppState>, action: PayloadAction<string>) => {
            state.user = action.payload;
        }
    },
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer
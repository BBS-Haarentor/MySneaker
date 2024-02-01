import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {ILogin, IUser} from "types";
import Cookies from 'js-cookie';

interface AppState extends ILogin {}

const initialState: ILogin = {
  access_token: "",
  expires_in: 0,
  token_type: "",
  user: {
    role: [],
    id: 0,
    username: "",
    status: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state: Draft<AppState>, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUser: (state: Draft<AppState>, action: PayloadAction<ILogin>) => {
      console.log(action.payload)
      state = action.payload;
      console.log(state)
      Cookies.set('access_token', action.payload.access_token)
    },
    logout: (state: Draft<AppState>) =>  {
      state = initialState;
      Cookies.remove('access_token');
      console.debug("Access Token remove and logout finished")
    }
  },
});

export const { updateUser, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
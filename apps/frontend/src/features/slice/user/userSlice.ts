import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "types";

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
    updateUser: (state: Draft<AppState>, action: PayloadAction<string>) => {},
    setUser: (state: Draft<AppState>, action: PayloadAction<ILogin>) => {
      console.log(action)
    },
  },
});

export const { updateUser, setUser } = userSlice.actions;

export default userSlice.reducer;
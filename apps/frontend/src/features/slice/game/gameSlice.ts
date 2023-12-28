import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { IGameData } from 'types';

interface AppState extends IGameData {}

const initialState: IGameData = {
  cycle: undefined,
  scenario: undefined,
  stock: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state: Draft<AppState>, action: PayloadAction<IGameData>) => {
      console.log(action.payload)
    },
  },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentScaleState = {
  scaleAmount: number;
};

let initialState: CurrentScaleState = {
  scaleAmount: 100,
};

const scaleSlice = createSlice({
  name: "scale",
  initialState,
  reducers: {
    increment(state) {
      const { scaleAmount } = state;
      state.scaleAmount = scaleAmount >= 150 ? scaleAmount : scaleAmount + 5;
    },
    decrement(state) {
      const { scaleAmount } = state;
      state.scaleAmount = scaleAmount <= 30 ? scaleAmount : scaleAmount - 5;
    },
    setScale(state, action: PayloadAction<number>) {
      state.scaleAmount = action.payload;
    },
  },
});

export const { setScale, decrement, increment } = scaleSlice.actions;

export default scaleSlice.reducer;

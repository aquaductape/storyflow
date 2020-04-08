import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentScrollState = {
  scrollPosition: {
    top: number;
    left: number;
  };
};

let initialState: CurrentScrollState = {
  scrollPosition: { top: 0, left: 0 },
};

const scrollPositionSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setScrollPosition(
      state,
      action: PayloadAction<{ top: number; left: number }>
    ) {
      const { payload } = action;
      state.scrollPosition = { ...payload };
    },
  },
});

export const { setScrollPosition } = scrollPositionSlice.actions;

export default scrollPositionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import localStore from "./local-storage";

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState: localStore.load().uiState,
  reducers: {
    filter(state, { payload: filterBy }) {
      state.filterBy = filterBy;
    },

    sort(state, { payload: sortBy }) {
      state.sortBy = sortBy;
      if (sortBy === "complete") state.filterBy = "all";
    },
  },
});

export const { filter, sort } = uiStateSlice.actions;
export default uiStateSlice.reducer;

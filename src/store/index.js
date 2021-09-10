import { configureStore } from "@reduxjs/toolkit";
import todos from "./todos";
import uiState from "./ui-state";

export default configureStore({
  reducer: {
    todos,
    uiState,
  },
});

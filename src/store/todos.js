import { createSlice } from "@reduxjs/toolkit";
import localStore from "./local-storage";

const _getId = () => Math.ceil(Math.random() * 10000);

export const todosSlice = createSlice({
  name: "todos",
  initialState: localStore.load().todos,
  reducers: {
    add(state, { payload }) {
      const todo = {
        ...payload,
        updatedAt: new Date().toString(),
        id: _getId(),
        done: false,
      };

      state.push(todo);
    },

    remove(state, { payload: id }) {
      const index = state.findIndex((item) => item.id === id);
      state.splice(index, 1);
    },

    allLabels(state) {
      return state.todos.map((todo) => todo.labels).flatten();
    },

    update(state, { payload: todo }) {
      const index = state.findIndex((item) => item.id === todo.id);
      todo.updatedAt = new Date().toString();
      state[index] = todo;
    },
  },
});

export const {
  add, update, remove, allLabels,
} = todosSlice.actions;
export default todosSlice.reducer;

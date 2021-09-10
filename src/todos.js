import React, { useEffect } from "react";
import { connect } from "react-redux";
import Todo from "./todo";
import { add } from "./store/todos";
import LocalStore from "./store/local-storage";

function Todos({ todos, filterBy, sortBy }) {
  function filter(item) {
    if (filterBy === "incomplete") return !item.done;
    if (filterBy === "complete") return item.done;
    return true;
  }

  function sort(a, b) {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "complete") return a.done - b.done;
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  }

  useEffect(() => LocalStore.savePath("todos", todos));

  return (
    <ul className="todos">
      {
        todos.filter(filter).sort(sort).map((todo, index) => (
          <Todo
            key={todo.id}
            todo={todo}
          />
        ))
      }
    </ul>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  sortBy: state.uiState.sortBy,
  filterBy: state.uiState.filterBy,
});

export default connect(mapStateToProps)(Todos);

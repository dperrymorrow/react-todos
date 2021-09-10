import React, { useState } from "react";
import { connect } from "react-redux";
import { update, remove } from "./store/todos";
import TodoForm from "./todo-form";
import Labels from "./labels";

function Todo({ todo, updateTodo, removeTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const checkboxId = `todo-checkbox-${todo.id}`;

  function save(updated) {
    setIsEditing(false);
    updateTodo({
      ...todo,
      ...updated,
    });
  }

  return (
    <li>
      {
        isEditing
          ? (
            <TodoForm todo={todo} save={save} saveLabel="Save">
              <button onClick={setIsEditing.bind(null, false)}>Cancel</button>
            </TodoForm>
          )
          : (

            <div className="todo">
              <label htmlFor={checkboxId}>
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={todo.done}
                  onChange={save.bind(null, { done: !todo.done })}
                />
                {
                    todo.done ? <s>{todo.name}</s> : <span>{todo.name}</span>
                  }
                {
                    todo.labels.length ? <Labels labels={todo.labels || []} /> : ""
                  }
              </label>

              <span className="actions">
                <span className="date">{new Date(todo.updatedAt).toLocaleString()}</span>
                <button onClick={removeTodo.bind(null, todo.id)}>delete</button>
                <button onClick={() => setIsEditing(true)}>edit</button>
              </span>
            </div>

          )
        }
    </li>
  );
}

export default connect(null, { updateTodo: update, removeTodo: remove })(Todo);

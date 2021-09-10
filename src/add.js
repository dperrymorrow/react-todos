import React, { useState } from "react";
import { connect } from "react-redux";
import TodoForm from "./todo-form";
import { add } from "./store/todos";

function Add({ addTodo }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="add-bar">
      {
        isAdding ? (
          <TodoForm saveLabel="Add todo" save={addTodo}>
            <button onClick={setIsAdding.bind(null, false)}>Cancel</button>
          </TodoForm>
        ) : <button onClick={setIsAdding.bind(null, true)}>Add another</button>
    }
    </div>

  );
}

export default connect(null, { addTodo: add })(Add);

import React, { useState, useEffect } from "react";
import Labels from "./labels";

function TodoForm({
  todo, saveLabel, save, children,
}) {
  const [name, setName] = useState(todo?.name || "");
  const [labels, setLabels] = useState(todo?.labels || []);
  const isValid = name.length > 0;

  function emit() {
    save({ ...todo, name, labels });
    setName("");
    setLabels([]);
  }

  function keyDown({ key }) {
    if (key === "Enter" && isValid) emit();
  }

  return (
    <div className="todo-form-container">
      <div className="todo-form">
        <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="What needs done?" onKeyDown={keyDown} />
        <div className="actions">
          <button disabled={!isValid} onClick={emit}>{ saveLabel }</button>
          { children }
        </div>
      </div>
      <Labels labels={labels} isEditing update={setLabels} />
    </div>
  );
}

export default TodoForm;

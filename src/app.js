import React from "react";
import Add from "./add";
import Todo from "./todo";
import Todos from "./todos";
import Filters from "./filters";

function App() {
  return (
    <div id="demo-app" className="app">
      <Filters />
      <Todos />
      <Add />
    </div>
  );
}

export default App;

import React from "react";

// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function Main() {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState("");

  const saveData = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  React.useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  const onAddTodo = () => {
    if (newTodo.trim()) {
      let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
      setTodos(newTodos);
      setNewTodo("");
      saveData(newTodos);
    }
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    saveData(newTodos);
  };

  const clearList = () => {
      let newTodos = [];
      setTodos(newTodos);
      setNewTodo("");
      saveData(newTodos);
  };

  // ****************** Begin JSX ********************

  return (
    <Container className="p-3">

    <div className="container mt-5">
      <h2 className="text-center">Todo</h2>

      <input
                type="text"
                id="todoInput"
                className="form-control"
                placeholder="add todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />

      <button className="btn btn-primary btn-block" onClick={onAddTodo}>
                {" "}
                Add
              </button>

      <table className="table table-dark mt-5">


        <tbody id="table">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.todo}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  {" "}
                  Delete{" "}
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <Button variant="warning" onClick={clearList}>Start from Scratch</Button>

    </Container>
  );
}
  
  export default Main;
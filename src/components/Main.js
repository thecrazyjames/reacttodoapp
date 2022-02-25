import React from "react";

// import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table'
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import fa-trash-can from '@fortawesome/free-solid-svg-icons'

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

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
  if (event.key === 'Enter') {
    onAddTodo();
  }
};

  // ****************** Begin JSX ******************** //

  return (
    <Container className="p-3 Main">

    <div className="container mt-5">
      <div className="input">

      <h2 className="text-center">To-Do List Application <FontAwesomeIcon icon={faCoffee} /></h2>

      <input
                type="text"
                id="todoInput"
                className="form-rounded"
                placeholder="Add something to your to-do list"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeypress}
              />

      <button className="btn btn-primary btn-block" onClick={onAddTodo}>
                {" "}
                Add
              </button>

      </div>
      
      {/* <Table striped bordered hover responsive>


        <tbody id="table">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td colSpan={2}>{todo.todo}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      <ListGroup variant="flush">
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} action onClick={() => deleteTodo(todo.id)}>{todo.todo}</ListGroupItem>
        ))}
        
      </ListGroup>

    </div>
    
    <Button variant="warning" onClick={clearList}>Clear the List</Button>

    </Container>
  );
}
  
  export default Main;
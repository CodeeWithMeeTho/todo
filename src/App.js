import React, { useState, useEffect } from "react";
import "./App.css";
//IMPORTING COMPONENTS
import Form from "./Components/Form";
import TodoList from "./Components/Todolist";

function App() {
  //STATE STUFF
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setfilteredTodos] = useState([]);
  //RUNS ONCE
  useEffect(() => {
    getLocalTodos();
  }, []);
   //USEEFFECT STUFF
   useEffect(() => {
      filterHandler();
      saveLocalTodos();
  }, [todos, status]);
  //FUNCTIONS & EVENTS
  const filterHandler = () => {
    switch(status){
      case "completed":
        setfilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case "uncompleted":
          setfilteredTodos(todos.filter(todo => todo.completed === false));
          break;
          default:
            setfilteredTodos(todos);
            break;
    }
  };
  //LOCAL SAVE TO FILES
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
    const getLocalTodos = () => {
      if(localStorage.getItem('todos') ===null){
        localStorage.setItem('todos', JSON.stringify([]));
      }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
       setTodos(todoLocal)
      }
    }
  return (
    <div className="App">
      <header>
        <h1>Sean's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList  filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}
export default App;

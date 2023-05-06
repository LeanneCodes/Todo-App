import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS") // fetching local storage for recent todo list
    if (localValue == null) return [] // if there was no todo list - the list will be empty

    return JSON.parse(localValue) // translates the JSON file and displays the recent todo list
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos)) // add items to local storage
  }, [todos])

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title, completed: false} // gives each todo an unique id, a title and empty checkbox
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed} // toggles the todo item to be checked or not checked
        }
        return todo // remaining todo items will not change if not clicked on
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id) // if the id matches with the item you want to delete, it will be deleted
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
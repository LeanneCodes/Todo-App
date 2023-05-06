import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault() // prevents browser from refreshing
        if (newItem === "") return // if the input bar is empty, you won't be able to add a new todo
    
        onSubmit(newItem) // new todo is added to the list
    
        setNewItem("") // after adding a new todo, the input bar is cleared of previous entry
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
            <label htmlFor="item">New Item</label>
            <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item" />
            </div>
            <button className="btn">Add</button>
        </form>
    )
}
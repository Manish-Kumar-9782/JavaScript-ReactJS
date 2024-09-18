import React from 'react'

const Todo = ({ todo, dispatch }) => {
    return (
        <li className='todo-item' key={todo.id}>
            <span>{todo.title}</span>
            <div className='todo-actions'>
                <button onClick={() => dispatch({ type: "UPDATE-REQUEST", id: todo.id })}>Update</button>
                <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>Delete</button>
            </div>
        </li>
    )
}

export default Todo

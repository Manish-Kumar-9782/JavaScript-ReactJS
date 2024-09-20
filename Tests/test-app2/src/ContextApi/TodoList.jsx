import React from 'react'
import Todo from './Todo'
const TodoList = ({ todo_list }) => {
    return (
        <ul>
            {todo_list.map((todo, index) => <Todo key={index} todo={todo} />)}
        </ul>
    )
}

export default TodoList

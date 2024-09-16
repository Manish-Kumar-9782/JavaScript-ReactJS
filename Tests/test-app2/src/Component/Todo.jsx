import React from 'react'

const Todo = ({ todo }) => {
    return (
        <div style={{
            backgroundColor: 'lightblue',
            padding: '10px',
            margin: '10px'
        }}>
            <table>
                <tr>
                    <td>User Id :</td>
                    <td>{todo.userId}</td>
                </tr>
                <tr>
                    <td>Id :</td>
                    <td>{todo.id}</td>
                </tr>
                <tr>
                    <td>Title :</td>
                    <td>{todo.title}</td>
                </tr>
                <tr>
                    <td>Completed :</td>
                    <td>{todo.completed}</td>
                </tr>
            </table>
        </div>
    )
}

export default Todo

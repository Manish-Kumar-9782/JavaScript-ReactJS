import React from 'react'

const Delete = (props) => {
    return (
        <button id={props.id} onClick={(e) => {
            console.log("Clicked target:", e.target.id)
            props.delete(e.target.id)
        }}>
            delete
        </button>
    )
}

export default Delete

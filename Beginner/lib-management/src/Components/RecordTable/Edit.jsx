import React from 'react'



const Edit = (props) => {

    return (
        <button id={props.id} onClick={(e) => {
            props.update(e.target.id)
        }}>
            edit
        </button>
    )
}

export default Edit

Edit.defaultProps = {
    id: 0,
}   
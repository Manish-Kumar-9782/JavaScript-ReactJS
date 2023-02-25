import React from 'react'



const Edit = (props) => {

    const onHandleEditClick = () => {

    }

    return (
        <button id={props.id} >
            edit
        </button>
    )
}

export default Edit

Edit.defaultProps = {
    id: 0,
}   
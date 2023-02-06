import React from 'react'
import ListItem from './ListItem'


const ListContainer = (props) => {

    function deleteItem(elementId) {
        props.setTodoItems(
            props.todoItems.filter(item => item.id !== elementId)
        )
    }

    return (
        <ul type="none" style={{
            padding: "20px",
            border: "1px solid black",
            width: "300px",
            textAlign: "left"
        }}>
            {/* Now here we will update our list content as we change the 
            the state of the listItems from the TodoApp Component. */}
            {props.todoItems.map(item => {
                return <ListItem id={item.id} text={item.text}
                    onDelete={deleteItem} />
            })}
        </ul>
    )
}

export default ListContainer

import React, { useState } from 'react'
import Input from './Input'
import ListContainer from './ListContainer';
// import ListItem from './ListItem';

const TodoApp = () => {
    const [listItems, setItems] = useState([]);
    // initially our list Array is empty

    const [input, setInput] = useState("");
    // a state hook to control the state of the input 

    // Now we will have another state hook to control the
    // the index number of each item.

    const [elementId, setElementId] = useState(0);


    // Now we will have another function which will be called on the click of the delete button 
    // for each list item.



    // A function to add a new item in to the list 
    function addItem(item) {
        let tempList = [...listItems, {
            id: elementId,
            text: item,
        }];

        setItems(tempList);
        console.log(listItems);
        // console.log("index: " + index);
        setInput("")
        setElementId(elementId + 1); // Increasing the element id.

    }



    return (
        <div>
            <Input inputContent={input} onSave={addItem} />
            {/* A container to store all the list item inside it.  */}
            <ListContainer todoItems={listItems} setTodoItems={setItems} />

        </div>
    )
}

export default TodoApp

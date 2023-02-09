import React, { useState } from 'react'

const Edit = (props) => {

    const [value, setValue] = useState(props.currentData)

    function edit() {
        let newData = props.data.map(item => {
            if (item.id === props.id) {
                item.text = value;
            }
            return item;
        })

        props.setData(newData);
    }

    function onValueChange(e) {
        setValue(e.target.value);
    }



    return (
        <input type='text' value={value} onChange={(e) => onValueChange(e)}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    edit();
                    props.removeEdit();
                }
            }}
        />
    )
}

export default Edit

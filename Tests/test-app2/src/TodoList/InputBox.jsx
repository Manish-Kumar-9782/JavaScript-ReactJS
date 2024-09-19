import { useRef, useEffect, useState } from 'react'

const InputBox = ({ onAdd, onUpdate, updateTodo = null, isUpdate = false, }) => {

    const input = useRef(null)
    // const [shouldUpdate, setShouldUpdate] = useState(false)

    if (isUpdate) {
        console.log("current updateTodo: ", updateTodo)
        input.current.value = updateTodo.title
    }

    const handle_submit = () => {

        console.log("updated content", input.current.value)
        if (isUpdate) {
            onUpdate({ id: updateTodo.id, title: input.current.value })
            input.current.value = "";
        }
        else {
            onAdd(input.current.value)
            input.current.value = "";
        }
    }


    return (
        <div>
            <input ref={input} type="text" />
            <button type="button" onClick={handle_submit}>
                {isUpdate ? 'Update' : 'Add'}
            </button>
        </div>
    )
}

export default InputBox

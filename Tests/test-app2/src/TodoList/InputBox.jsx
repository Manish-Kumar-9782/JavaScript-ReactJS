import { useRef, useEffect, useState } from 'react'




const InputBox = ({ onAdd, onUpdate, updateTodo = null, isUpdate = false, }) => {

    const input = useRef(null)
    const [shouldUpdate, setShouldUpdate] = useState(false)

    if (isUpdate) {
        input.current.value = updateTodo.title
    }

    useEffect(() => {
        const handle_submit = (content) => {

            console.log("updated content", content)
            if (isUpdate) {
                onUpdate({ id: updateTodo.id, title: content })
                input.current.value = "";

            }
            else {
                onAdd(content)
            }

        }

        if (shouldUpdate) {
            handle_submit(input.current.value)
            setShouldUpdate(false)
        }

    }, [shouldUpdate])


    return (
        <div>
            <input ref={input} type="text" />
            <button type="button" onClick={() => setShouldUpdate(true)}>
                {isUpdate ? 'Update' : 'Add'}
            </button>
        </div>
    )
}

export default InputBox

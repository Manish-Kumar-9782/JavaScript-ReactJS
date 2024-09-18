import { useReducer, useRef, useEffect } from 'react'



function reducer(state, action) {

    console.log(state, action)

    switch (action.type) {
        case "INCREMENT":

            if (action.payload != null && action.payload.amount != null) {
                return { count: state.count + action.payload.amount }
            }
            else {
                return { count: state.count + 1 };
            }

        case "DECREMENT":
            if (action.payload != null && action.payload.amount != null) {
                return { count: state.count - action.payload.amount }
            }
            else {
                return { count: state.count - 1 };
            }

        default:
            return state
    }
}

const Reducer = () => {

    const [state, dispatch] = useReducer(reducer, { count: 15 })
    let ref1 = useRef(10000);
    let input_ref = useRef(null)
    console.log(ref1)
    console.log(input_ref)




    useEffect(() => {
        if (input_ref.current != null) {
            input_ref.current.value = "hello"
        }
    }, [state])

    function update_ref() {
        ref1.current += 10;
        console.log(ref1)
    }

    return (
        <div>
            <span>{state.count}</span>
            <button onClick={() => dispatch({ type: "INCREMENT", payload: { amount: 10 } })}>increase</button>
            <button onClick={() => dispatch({ type: "DECREMENT", payload: { amount: 15 } })}>decrease</button>


            <hr />
            <button onClick={update_ref}>update ref</button>
            <span>{ref1.current}</span>

            <hr />
            <input ref={input_ref} type="text" />
        </div>
    )
}

export default Reducer

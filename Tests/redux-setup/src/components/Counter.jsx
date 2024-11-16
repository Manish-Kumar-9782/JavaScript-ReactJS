import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/slices/counterSlice'

const Counter = () => {

    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div>
            <button type='button' onClick={() => dispatch(increment())}>+</button>
            <span style={{ paddingInline: "20px" }}>Count: {count}</span>
            <button type='button' onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}

export default Counter

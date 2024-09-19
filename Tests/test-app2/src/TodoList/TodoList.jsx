import { useReducer } from 'react'
import InputBox from './InputBox'
import Todo from './Todo'
import reducer, { initialState, getTodo } from './reducer'

const TodoList = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className='todo-list'>
            <InputBox
                onAdd={(todo) => dispatch({ type: "ADD", title: todo })}

                onUpdate={(todo) => dispatch({ type: "UPDATE", payload: todo })}
                isUpdate={state.inputAction.isUpdate}
                updateTodo={getTodo(state, state.inputAction.updateTodoId)} />

            <ul>
                {state && state.todos.map(todo => <Todo
                    todo={todo}
                    dispatch={dispatch}
                />)}
            </ul>
        </div>
    )
}

export default TodoList

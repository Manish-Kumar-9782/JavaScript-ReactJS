import { useReducer } from 'react'
import InputBox from './InputBox'
import Todo from './Todo'


let initialState = {
    todos: [
        { id: 1, title: 'Buy groceries' },
        { id: 2, title: 'Walk the dog' },
        { id: 3, title: 'Finish coding assignment' },
        { id: 4, title: 'Call mom' },
        { id: 5, title: 'Read a book' }
    ],
    autoId: 6,

    inputAction: {
        isUpdate: false,
        updateTodoId: null
    }
}   // an array of todo items

const reducer = (state, action) => {

    switch (action.type) {
        case "ADD":
            break;

        case "UPDATE-REQUEST":
            let new_state = { ...state, inputAction: { isUpdate: true, updateTodoId: action.id } }
            return new_state;

        case "UPDATE":

            let old_todo = state.todos
            let new_todo = old_todo.map(todo => {

                if (todo.id === action.payload.id) {
                    return { id: todo.id, title: action.title }
                }
                return todo
            })
            return { ...state, todos: new_todo }


        case "DELETE":
            console.log(action)
            return state
        default:
            return state;
    }

}


function getTodo(state, id) {
    return state.todos.filter(todo => todo.id === id)[0]

}


const TodoList = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className='todo-list'>
            <InputBox onUpdate={(todo) => dispatch({ type: "UPDATE", payload: todo })}
                isUpdate={state.inputAction.isUpdate}
                updateTodo={getTodo(state, state.inputAction.updateTodoId)}

            />

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


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
            console.log("add action in play: ", action)
            // for new todo we need to generate a new id.
            let new_item = { id: state.autoId, title: action.title }
            let new_state_add = { ...state, todos: [...state.todos, new_item], autoId: state.autoId + 1 }
            return new_state_add


        case "UPDATE-REQUEST":
            let new_state = { ...state, inputAction: { isUpdate: true, updateTodoId: action.id } }
            return new_state;

        case "UPDATE":

            console.log("update action in play: ", action)

            let old_todo = state.todos
            let new_todo = old_todo.map(todo => {

                if (todo.id === action.payload.id) {
                    return { id: todo.id, title: action.payload.title }
                }
                return todo
            })
            return {
                ...state, todos: new_todo,
                inputAction: {
                    isUpdate: false,
                    updateTodoId: null
                }
            }

        case "DELETE":
            console.log("Delete action in play: ", action)

            return { ...state, todos: state.todos.filter(todo => todo.id !== action.id) }

        default:
            return state;
    }

}

function getTodo(state, id) {
    return state.todos.filter(todo => todo.id === id)[0]

}


export default reducer
export { initialState, getTodo }
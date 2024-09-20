import React from 'react'
import data from './data'

import TodoList from './TodoList'
import CategoryTask from './CategoryTask'

const ListContainer = () => {

    console.log(data)
    return (
        <div>
            <div>
                <h1>Person Task</h1>
                <TodoList todo_list={data.personalTask} />
            </div>

            <div>
                <h1>Todos</h1>
                <TodoList todo_list={data.todo} />
            </div>

            <div>
                <h1>Category Task</h1>
                <CategoryTask />
            </div>
        </div>
    )
}

export default ListContainer

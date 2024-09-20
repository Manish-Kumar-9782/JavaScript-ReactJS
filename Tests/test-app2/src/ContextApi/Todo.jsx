import { useContext } from 'react'

import { ThemeContext } from './Context'

const Todo = ({ todo }) => {

    const theme = useContext(ThemeContext)

    return (
        <li style={{ backgroundColor: theme.bg }}>
            {todo}

            {theme.ctask
                &&
                <ul>
                    {theme.ctask.Home.map(todo => <li key={todo}>{todo}</li>)}
                </ul>

            }
        </li>
    )
}

export default Todo

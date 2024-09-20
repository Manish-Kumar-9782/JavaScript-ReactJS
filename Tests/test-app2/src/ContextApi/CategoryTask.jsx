import { useContext } from 'react'
import { ThemeContext } from './Context'


const CategoryTask = () => {

    const { ctask } = useContext(ThemeContext)

    const lists = Object.values(ctask)

    return (
        <div>
            {lists && lists.map(list => {

                return (
                    <ul>
                        {list.map(item => <li>{item}</li>)}
                    </ul>
                )
            })}

        </div>
    )
}



export default CategoryTask

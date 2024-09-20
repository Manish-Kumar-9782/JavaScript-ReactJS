import React, { createContext } from 'react'
import data from './data'
import ListContainer from './ListContainer'

const ThemeContext = createContext()


const Context = () => {
    return (
        <ThemeContext.Provider value={{ bg: "gray", ctask: data.categoryTask }}>
            <ListContainer />
        </ThemeContext.Provider>
    )
}

export default Context
export { ThemeContext }


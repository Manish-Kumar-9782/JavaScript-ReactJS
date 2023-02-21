import React from 'react'
import CellData from './CellData'
import CellHeading from './CellHeading'
const Row = (props) => {

    return (
        <tr>
            {props.type === "heading" ?
                // for heading row
                props.data.map(cell_data => {
                    return <CellHeading data={cell_data} />
                }) :

                // for normal data row
                props.data.map(cell_data => {
                    return <CellData data={cell_data} />
                })}

        </tr>
    )
}

export default Row

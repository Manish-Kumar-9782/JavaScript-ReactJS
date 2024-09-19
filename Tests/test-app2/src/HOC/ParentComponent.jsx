import React from 'react'

const ParentComponent = ({ childComponent }) => {
    return (
        <div>
            <h1>This is layout example</h1>

            {childComponent}

            <ul>
                <li>This item 1</li>
                <li>This item 2</li>
                <li>This item 3</li>
                <li>This item 4</li>
            </ul>
        </div>
    )
}

export default ParentComponent

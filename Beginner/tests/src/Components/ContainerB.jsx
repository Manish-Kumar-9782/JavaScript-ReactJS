import React from 'react'
import ContainerC from './ContainerC'
const ContainerB = ({ value }) => {
    return (
        <div style={{
            width: '100%',
            height: "70vh",
            backgroundColor: "blue",
            color: "white",
            padding: "50px"
        }}>
            ContainerB
            <ContainerC value={value} />
        </div>
    )
}

export default ContainerB

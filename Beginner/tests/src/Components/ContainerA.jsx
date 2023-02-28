import React from 'react'
import ContainerB from './ContainerB'
const ContainerA = ({ value }) => {
    return (
        <div style={{
            width: '100%',
            height: "100vh",
            backgroundColor: "red",
            color: "white",
            padding: "50px"
        }}>
            ContainerA
            <ContainerB value={value} />
        </div>
    )
}

export default ContainerA

import { useState, useEffect } from 'react'

const Loading = () => {

    const [dots, setDots] = useState("")



    useEffect(() => {

        const loading_function = () => {

            if (dots.length >= 3) {
                console.log("resetting dots...")
                setDots("")
            }
            else {
                console.log("adding dots...")
                setDots(dots + ".")
            }
            console.log(dots)

        }

        setTimeout(loading_function, 100)

    }, [dots])

    return (
        <div>
            <h1>Loading{dots}</h1>
        </div>
    )
}

export default Loading

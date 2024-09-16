import { useEffect, useState } from 'react'
import Todo from './Todo'
import Loading from './Loading'

const initialState = {
    "status": "idle",
    "data": [],
    "error": null
}

const FetchData = () => {

    const [data, setData] = useState(initialState)


    useEffect(() => {
        //  fetch data from API
        setData({ ...data, status: 'loading' }) // set status to loadings

        console.log("Data is being loading....")

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                setData({ status: "loaded", data: json, error: null })
            })

    }, [])


    useEffect(() => {
        console.log("data state is update....", data)
        if (data.status === "loaded") {
            console.log("Data has been loaded")
            setData({ ...data, status: "idle" })
        }

    }, [data])

    return (
        <div>

            {data.status === "loading" ?
                <Loading />
                : data.status === "loaded" ?
                    <h1>Loaded..</h1> :
                    data.data.map((todo) => <Todo todo={todo} />)

            }

        </div>
    )
}

export default FetchData

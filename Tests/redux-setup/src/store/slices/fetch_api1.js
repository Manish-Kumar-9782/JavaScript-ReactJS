const get_task_lists_url = "http://localhost:8000/tasks/get_task_lists"

export function fetchTaskLists(dispatch) {

    // initiating the data loading..

    const data = null

    fetch(get_task_lists_url)

        .then(response => {

            // after fetching data we need to prepare it for loading.
            // dispatch(updateStatus({ status: "loading" }))

            // if response is ok then we need to parse the data.
            data = response.json()
        })

        .then(json => {
            // here our data is loaded and we need to update the state as fulfilled.
            // dispatch(updateStatus({ status: "fulfilled" }))
            // dispatch(loadData(json))
            return json
        })

    return data

}
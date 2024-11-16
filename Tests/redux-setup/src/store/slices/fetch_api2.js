import { updateStatus, loadData } from "./taskListSlice"

const get_task_lists_url = "http://localhost:8000/tasks/get_task_lists"

export function fetchTaskLists(dispatch) {

    // initiating the data loading..
    dispatch(updateStatus({ status: "pending" }))

    return fetch(get_task_lists_url)

        .then(response => {

            if (!response.ok) {
                // if response is not ok then we need to throw an error.
                throw new Error("LoadError:Unable to Load data")
            }

            // after fetching data we need to prepare it for loading.
            dispatch(updateStatus({ status: "loading" }))

            // if response is ok then we need to parse the data.
            return response.json()
        })

        .then(json => {
            // here our data is loaded and we need to update the state as fulfilled.
            dispatch(loadData(json))
            dispatch(updateStatus({ status: "fulfilled" }))

        })

        .catch(error => {
            let status = { status: "error", error }
            dispatch(updateStatus(status))
            console.log("FetchTaskListError: There was a problem while fetching the tasklists")
            return status
        })
}
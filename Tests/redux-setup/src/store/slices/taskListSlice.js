import { createSlice } from "@reduxjs/toolkit";


const get_task_lists_url = "http://localhost:8000/tasks/get_task_lists"

export function fetchTaskLists(dispatch) {

    // initiating the data loading..
    dispatch(updateStatus({ status: "pending" }))

    return fetch(get_task_lists_url)

        .then(response => {

            if (!response.ok) {
                // if response is not ok then we need to throw an error.
                throw new Error("LoadError:Unable to Load")
            }

            // after fetching data we need to prepare it for loading.
            dispatch(updateStatus({ status: "loading" }))

            // if response is ok then we need to parse the data.
            return response.json()
        })

        .then(json => {
            // here our data is loaded and we need to update the state as fulfilled.
            dispatch(updateStatus({ status: "fulfilled" }))
            dispatch(loadData(json))

        })

        .catch(error => {
            let status = { status: "error", error }
            dispatch(updateStatus(status))
            console.log("FetchTaskListError: There was a problem while fetching the tasklists")
            return status
        })
}


const taskList = createSlice({
    name: "counter",
    initialState: { status: 'idle', tasklists: null, error: null },
    reducers: {
        loadData: (state, action) => {
            state.tasklists = action.payload
            state.status = 'idle'
        },

        updateStatus: (state, action) => {
            state.status = action.payload.status
            state.error = action.payload.error
        }
    }

})


export const { loadData, updateStatus } = taskList.actions;
export default taskList.reducer;  // register this reducer method to store's reducers.

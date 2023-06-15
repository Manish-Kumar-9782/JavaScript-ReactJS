import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const initialState = {
    currentStudent: null,
    currentCourseProfile: null,
    reload: false,
    reloadCourseData: false,
}


export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        updateCurrentStudentId(state, action) {
            if (state.currentStudent !== action.payload)
                state.reload = true
            state.currentStudent = action.payload;

        },
        updateCurrentCourseProfileId(state, action) {
            if (state.currentCourseProfile !== action.payload) {
                state.reloadCourseData = true;
            }
            state.currentCourseProfile = action.payload;
        },
        resetAppReload(state) {
            state.reload = false;
        },
        resetCourseDataReload(state) {
            state.reloadCourseData = false;
        }
    }
}
)


export const reloadStatus = (state) => state.app.reload;

// export const appStatus = (state) => {
//     return {
//         reload: state.app.reload,

//     }
// } 

export const { updateCurrentStudentId, updateCurrentCourseProfileId,
    resetAppReload, resetCourseDataReload } = appSlice.actions

export default appSlice.reducer
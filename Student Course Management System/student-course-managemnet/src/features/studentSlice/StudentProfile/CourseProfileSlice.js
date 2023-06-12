import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
// ============================= ENTITY ADAPTER START =============================//
const courseProfileAdapter = createEntityAdapter({
    selectId: (state) => {
        return state._id
    }
})

const STUDENT_URL = 'http://localhost:4000/students'

const initialState = courseProfileAdapter.getInitialState({
    status: 'idle',
    error: null,
    courseProfilesIds: {},
    reload: false,
})
// ============================= ENTITY ADAPTER END =============================//

// ============================= THUNK START =============================//
export const fetchStudentCourseProfile = createAsyncThunk('studentCourseProfile/fetchStudentCourseProfile', async (studentId) => {
    const url = `${STUDENT_URL}/${studentId}/api/?get=courseProfile`
    const response = await axios.get(url)

    if (response.status === 200) {
        return response.data
    }
    else {
        console.error({ status: response.status, message: response.error })
    }
})

// ============================= THUNK END =============================//

// ============================= SLICE START =============================//
export const courseProfileSlice = createSlice({
    name: 'studentCourseProfile',
    initialState,
    reducers: {
        resetCourseProfileStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.reload = false;
        },

        updateCourseProfileReloadStatus(state, action) {
            state.reload = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchStudentCourseProfile.pending, (state, action) => {
            state.status = 'pending'
        })

        builder.addCase(fetchStudentCourseProfile.fulfilled, (state, action) => {
            state.status = 'success'
            courseProfileAdapter.setAll(state, action.payload)
        })

        builder.addCase(fetchStudentCourseProfile.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error
        })
    }
})
// ============================= SLICE END =============================//

export const getCourseProfileStatus = (state) => state.studentCourseProfile.status;
export const getCourseProfileError = (state) => state.studentCourseProfile.error;

export const { selectById: getCourseProfileById } = courseProfileAdapter.getSelectors(state => state.studentCourseProfile)

export const getCourseProfile_byCourseId = (state, courseProfileId) => {
    const entities = state.studentCourseProfile.entities
    for (let key in entities) {
        if (entities[key]._id === courseProfileId) return entities[key]
    }
}

export const { resetCourseProfileStatus, updateCourseProfileReloadStatus } = courseProfileSlice.actions

export default courseProfileSlice.reducer;
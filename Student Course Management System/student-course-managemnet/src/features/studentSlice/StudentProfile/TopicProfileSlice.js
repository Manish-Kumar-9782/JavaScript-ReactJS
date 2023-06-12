import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
// ============================= ENTITY ADAPTER START =============================//
const topicProfileAdapter = createEntityAdapter({
    selectId: (state) => state.topicId
})

const STUDENT_URL = 'http://localhost:4000/students'

const initialState = topicProfileAdapter.getInitialState({
    status: 'idle',
    error: null,
    reload: false
})
// ============================= ENTITY ADAPTER END =============================//

// ============================= THUNK START =============================//
export const fetchStudentTopicProfile = createAsyncThunk('studentTopicProfile/fetchStudentTopicProfile', async (studentId) => {
    const url = `${STUDENT_URL}/${studentId}/api/?get=topicProfile`
    const response = await axios.get(url)

    if (response.status === 200) {
        return response.data
    }
    else {
        console.error({ status: response.status, message: response.error })
    }
})

export const patchStudentTopicProfile = createAsyncThunk('studentTopicProfile/patchStudentTopicProfile', async (topicProfile) => {
    const { studentId, courseId, sectionId, topicId, data } = topicProfile
    const url = `${STUDENT_URL}/${studentId}/course/${courseId}/section/${sectionId}/topic/${topicId}`

    const response = await axios.patch(url, data)

    if (response.status === 200) {
        return response.data
    }
    else {
        console.error({ status: response.status, message: response.error })
    }
})

// ============================= THUNK END =============================//

// ============================= SLICE START =============================//
export const topicProfileSlice = createSlice({
    name: 'studentTopicProfile',
    initialState,
    reducers: {
        resetTopicProfileStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.reload = false;
        },

        updateTopicProfileReloadStatus(state, action) {
            state.reload = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchStudentTopicProfile.pending, (state, action) => {
            state.status = 'pending'
        })

        builder.addCase(fetchStudentTopicProfile.fulfilled, (state, action) => {
            state.status = 'success'
            topicProfileAdapter.setAll(state, action.payload)
        })

        builder.addCase(fetchStudentTopicProfile.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error
        })

        builder.addCase(patchStudentTopicProfile.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.info("pathStudentTopicProfile has been dispatched successfully")
        })
    }
})
// ============================= SLICE END =============================//

export const getTopicProfileStatus = (state) => state.studentTopicProfile.status;
export const getTopicProfileError = (state) => state.studentTopicProfile.error;


export const { selectAll: getAllTopic,
    selectById: getStudentTopicById } = topicProfileAdapter.getSelectors(state => state.studentTopicProfile)

export const { resetTopicProfileStatus, updateTopicProfileReloadStatus } = topicProfileSlice.actions;

export default topicProfileSlice.reducer;
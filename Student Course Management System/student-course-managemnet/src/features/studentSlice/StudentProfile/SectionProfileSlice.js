import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
// ============================= ENTITY ADAPTER START =============================//
const sectionProfileAdapter = createEntityAdapter({
    selectId: (state) => state._id
})

const STUDENT_URL = 'http://localhost:4000/students'

const initialState = sectionProfileAdapter.getInitialState({
    status: 'idle',
    error: null,
    reload: false
})
// ============================= ENTITY ADAPTER END =============================//

// ============================= THUNK START =============================//
export const fetchStudentSectionProfile = createAsyncThunk('studentSectionProfile/fetchStudentSectionProfile', async (studentId) => {
    const url = `${STUDENT_URL}/${studentId}/api/?get=sectionProfile`
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
export const sectionProfileSlice = createSlice({
    name: 'studentSectionProfile',
    initialState,
    reducers: {
        resetSectionProfileStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.reload = false;
        },

        updateSectionProfileReloadStatus(state, action) {
            state.reload = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchStudentSectionProfile.pending, (state, action) => {
            state.status = 'pending'
        })

        builder.addCase(fetchStudentSectionProfile.fulfilled, (state, action) => {
            state.status = 'success'
            sectionProfileAdapter.setAll(state, action.payload)
        })

        builder.addCase(fetchStudentSectionProfile.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error
        })
    }
})
// ============================= SLICE END =============================//

export const getSectionProfileStatus = (state) => state.studentSectionProfile.status;
export const getSectionProfileError = (state) => state.studentSectionProfile.error;

export const {
    selectAll: getAllSectionProfiles,
    selectById: getStudentCourseSectionById } = sectionProfileAdapter.getSelectors(state => state.studentSectionProfile)

export const { resetSectionProfileStatus, updateSectionProfileReloadStatus } = sectionProfileSlice.actions;

export default sectionProfileSlice.reducer;
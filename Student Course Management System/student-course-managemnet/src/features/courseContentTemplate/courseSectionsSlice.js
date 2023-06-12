import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


const COURSE_SECTION_URL = "http://localhost:4000/courses/";

// ======================================= ENTITY ADAPTER START =======================================//

const courseSectionsAdapter = createEntityAdapter({
    selectId: state => state._id,
})

const initialState = courseSectionsAdapter.getInitialState({
    status: 'idle',
    error: null,
    reload: false,
})

// ======================================= ENTITY ADAPTER END =======================================//

// ======================================= ASYNC THUNK START =======================================//

export const fetchCourseSections = createAsyncThunk("courseSections/fetchCourseSections", async (data) => {
    // to get all the section from the defined course by its id. 
    const { courseId } = data;
    console.log("fetch course section for: ", data);
    try {
        const response = await axios.get(`${COURSE_SECTION_URL}/${courseId}/sections`)
        return response.data.data
    } catch (error) {
        console.error("FetchCourseSectionError: " + error.message)

    }
})

export const addCourseSection = createAsyncThunk("courseSection/postCourseSection", async (data) => {
    // add a section to the given course
    try {
        const { courseId, title } = data;
        const response = await axios.post(`${COURSE_SECTION_URL}/${courseId}/sections`, { title });
        return response.data.data
    }
    catch (error) {
        console.error("PostCourseSectionError: ", error.message)
    }


})

// ======================================= ASYNC THUNK END =======================================//



// ======================================= SLICE START =======================================//

export const courseSectionsSlice = createSlice({
    name: 'courseSections',
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
        builder.addCase(fetchCourseSections.pending, (state, action) => {
            state.status = 'pending'
        })

        builder.addCase(fetchCourseSections.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error;
        })

        builder.addCase(fetchCourseSections.fulfilled, (state, action) => {
            state.status = 'success'
            // console.info("fetch course sections:", action.payload)
            courseSectionsAdapter.setAll(state, action.payload)
        })
        //-----------------------------------------------------------------------//
        builder.addCase(addCourseSection.pending, (state, action) => {
            state.status = 'pending'
        })

        builder.addCase(addCourseSection.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error;
        })

        builder.addCase(addCourseSection.fulfilled, (state, action) => {
            state.status = 'success'
            // console.info("fetch course sections:", action.payload)
            courseSectionsAdapter.upsertOne(state, action.payload)
        })

    }
})
// ======================================= SLICE END =======================================//

export default courseSectionsSlice.reducer;

export const getCourseSectionsStatus = (state) => state.courseSections.status;
export const getCourseSectionsError = (state) => state.courseSections.error;

export const { selectAll: selectAllSections, selectById: getSectionById } = courseSectionsAdapter.getSelectors(state => state.courseSections)
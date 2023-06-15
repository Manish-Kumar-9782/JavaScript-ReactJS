import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const COURSE_SECTION_URL = "http://localhost:4000/courses/";


// ================================= COURSE ENTITY ADAPTER START ================================= //

export const courseTopicAdapter = createEntityAdapter({
    selectId: state => state._id
})

// ================================= COURSE ENTITY ADAPTER END ================================= //


// ================================= COURSE ASYNC THUNK START ================================= //

export const fetchCourseTopics = createAsyncThunk("courseTopic/fetchCourseTopics", async (courseId) => {
    // Note by this we will fetch all topics comes under the given course by id.
    // in this we may have course for different sections.
    const url = `${COURSE_SECTION_URL}/${courseId}/fetch?get=topic`
    const response = await axios.get(url)

    return response.data

})

export const addCourseTopic = createAsyncThunk("courseTopic/addCourseTopic", async (data) => {
    // a async thunk to add a new topic inside a section or a topic which lies into a 
    // defined course.
    // console.log("PostCourseTopicData: ", data)
    try {
        const { courseId, sectionId, parentId, isSection, title } = data;
        // if topicId is also given then only we will add the new topic into the existing one.
        // else we will add the topic into the section.
        let url = !isSection
            ? `${COURSE_SECTION_URL}/${courseId}/sections/${sectionId}/topics/${parentId}`
            : `${COURSE_SECTION_URL}/${courseId}/sections/${sectionId}/topics`

        const response = await axios.post(url, { title })
        console.log("Response Add Course Topic", response)
        return response.data.data

    }
    catch (error) {
        console.error("PostCourseTopicError: ", error.message);
    }
})

// ================================= COURSE ASYNC THUNK END ================================= //


// ================================= COURSE SLICE START ================================= //

export const courseTopicSlice = createSlice({
    name: 'courseTopic',
    initialState: courseTopicAdapter.getInitialState({
        status: 'idle',
        error: null,
        reload: false,
        addTopic: 'idle',
        newTopicId: null,
        sectionId: null,
    }),
    reducers: {
        resetCourseTopicStatus(state) {
            state.status = 'idle';
            state.error = null;
            state.reload = false;
        },

        updateCourseTopicReloadStatus(state, action) {
            state.reload = action.payload;
        },
        updateAddCourseTopicStatus(state, action) {
            const { addStatus, topicId, sectionId } = action.payload;
            state.addTopic = addStatus ? addStatus : state.addTopic
            state.newTopicId = topicId !== undefined ? topicId : state.newTopicId
            state.sectionId = sectionId !== undefined ? sectionId : state.sectionId
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCourseTopics.pending, (state, action) => {
            state.status = 'pending';

        })

        builder.addCase(fetchCourseTopics.fulfilled, (state, action) => {
            state.status = 'success';

            courseTopicAdapter.setAll(state, action.payload)
        })

        builder.addCase(fetchCourseTopics.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.error;
        })

        //--------------------------------------------------------------------//

        builder.addCase(addCourseTopic.pending, (state, action) => {
            state.status = 'pending';
            state.addTopic = 'pending'
        })

        builder.addCase(addCourseTopic.fulfilled, (state, action) => {
            // here we need to add our new topic entry on two slices.
            // one this one itself and the other one is we need to add its id to the 
            // sectionSlice 
            courseTopicAdapter.upsertOne(state, action.payload)
            state.newTopicId = action.payload && action.payload._id;
            state.addTopic = 'success';
            state.status = 'success';
        })

        builder.addCase(addCourseTopic.rejected, (state, action) => {
            state.status = 'failed';
            state.addTopic = 'failed';
            state.error = action.payload.error;
        })
    }
})

// ================================= COURSE SLICE END  ================================= //

export const getCourseTopicStatus = (state) => state.courseTopic.status

export const getAddCourseTopicData = (state) => {
    return { addTopicStatus: state.courseTopic.addTopic, newTopicId: state.courseTopic.newTopicId }
}
export const getCourseTopicError = (state) => state.courseTopic.error

export const { selectAll: getAllTopics, selectById: getTopicById } = courseTopicAdapter.getSelectors(state => state.courseTopic)

export const { resetCourseTopicStatus, updateCourseTopicReloadStatus, updateAddCourseTopicStatus } = courseTopicSlice.actions
export default courseTopicSlice.reducer



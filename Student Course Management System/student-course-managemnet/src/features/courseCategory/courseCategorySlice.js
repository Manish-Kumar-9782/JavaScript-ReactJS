import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { courseAdapter } from "../courseSlice/courseSlice";


const COURSE_CATEGORIES_URL = "http://localhost:4000/course-categories"

const courseCategoryAdapter = createEntityAdapter({
    selectId: state => {
        // console.log("Course Category State: ", state)
        return state._id
    },
})

const initialState = courseCategoryAdapter.getInitialState({
    status: 'idle',
    error: null,
})


export const fetchCategories = createAsyncThunk("courseCategories/fetchCategories", async () => {
    const response = await axios.get(COURSE_CATEGORIES_URL)
    // console.log("course Categories Response:", response.data);
    return response.data
})

export const postCategories = createAsyncThunk("courseCategories/postCategories", async (entity) => {
    const response = await axios.post(COURSE_CATEGORIES_URL, entity)
    return response.data.entity;
})

export const courseCategorySlice = createSlice({
    name: "courseCategories",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.status = "pending";
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = "success"
            courseCategoryAdapter.upsertMany(state, action.payload);
        })

        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload.error;
        })

        builder.addCase(postCategories.pending, (state, action) => {
            state.status = "pending";
        })

        builder.addCase(postCategories.fulfilled, (state, action) => {
            state.status = "success";
            console.log("adding a category: ", action.payload)
            courseCategoryAdapter.addOne(state, action.payload);
        })

        builder.addCase(postCategories.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload.error;
        })
    }
})

export const {
    selectAll: selectAllCourseCategories,
    selectById: selectCourseCategoryById } = courseAdapter.getSelectors(state => state.courseCategories)

export default courseCategorySlice.reducer;
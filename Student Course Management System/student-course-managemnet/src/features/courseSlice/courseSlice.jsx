import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import data from "./course.json";
import axios from "axios";

export const courseAdapter = createEntityAdapter({
  selectId: (state) => state._id,
});

/**
 * Follow name convention for the async Thunk
 * addCourse --> postCourse
 * getCourse --> fetchCourse
 * updateCourse --> patchCourse
 * deleteCourse --> deleteCourse
 */

const COURSES_URL = "http://localhost:4000/courses";

console.log("course data from slice: ", data);

//============================= ASYNC THUNK ===================================//

export const addCourse = createAsyncThunk("courses/addCourse", async (data) => {
  const response = await axios.post(COURSES_URL, data);
  console.log("addCourse response: ", response);
  return response.data.entity;
});

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (data) => {
    const response = await axios.get(COURSES_URL, data);
    console.log("fetchCourse response: ", response);
    return response.data;
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    console.log(
      "from action course/deleteCourse deleting course with given id: ",
      id
    );
    try {
      const response = await axios.delete(COURSES_URL, { data: { id } });
      if (response.status === 200) {
        console.log(
          "success:",
          `course by id ${response.data.entity._id} deleted successfully`
        );
        return response.data.entity;
      } else if (response.status === 404) {
        console.error("Error: ", response.data.message);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

//============================= END ASYNC THUNK ================================//

//------------------------------------------------------------------------------//

//============================= ENTITY ADAPTER =================================//

export const initialState = courseAdapter.getInitialState({
  status: "idle",
  error: null,
});

//============================= END ENTITY ADAPTER =============================//

//------------------------------------------------------------------------------//

//============================= COURSE SLICE ===================================//

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addCourse.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.status = "success";
      courseAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(addCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });

    builder.addCase(fetchCourse.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(fetchCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });

    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.status = "success";
      courseAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(deleteCourse.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      if (!action.payload?._id) {
        state.status = "failed";
        return;
      }

      courseAdapter.removeOne(state, action.payload._id);
      state.status = "success";
    });

    builder.addCase(deleteCourse.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

//============================= END COURSE SLICE =============================//

export const { selectById: getCourseById, selectAll: getAllCourse } =
  courseAdapter.getSelectors((state) => state.courses);

export const getCourseStatus = (state) => state.courses.status;
export const getCourseError = (state) => state.courses.error;
export const getCourseCategories = (state) => state.courses.courseCategories;

export const { selectAll: selectAllCourses, selectById: selectCourseById } =
  courseAdapter.getSelectors((state) => state.courses);

export const getCoursesByIds = (state, courseIds) => {
  console.log("getting courses details for ids: ", courseIds);
  if (!courseIds) return false;

  if (state.courses.status === "success")
    return courseIds.map((courseId) => state.courses.entities[courseId]);

  return false;
};

export default courseSlice.reducer;

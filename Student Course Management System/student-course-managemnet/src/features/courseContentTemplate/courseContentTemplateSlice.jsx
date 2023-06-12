import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  nanoid,
} from "@reduxjs/toolkit";
import { courseAdapter } from "../courseSlice/courseSlice";
import axios from "axios";

const COURSE_SECTION_TEMPLATE_URL = "http://localhost:4000/courses/";

//============================= ASYNC THUNK HANDLER START ==============================//

export const postCourseTemplate = createAsyncThunk(
  "course/postCourseTemplate",
  async (sectionId) => {
    console.log("post course template: ", sectionId);
    const response = await axios.post(
      COURSE_SECTION_TEMPLATE_URL + `${sectionId}`,
      { data: "" }
    );
    return response.data;
  }
);

//============================== ASYNC THUNK HANDLER END ===============================//

const templateAdapter = createEntityAdapter({
  selectId: (state) => state._id,
});

const initialState = templateAdapter.getInitialState({});

export const courseContentTemplateSlice = createSlice({
  name: "courseContentTemplate",
  initialState,
  reducers: {
    addCourseSection: (state, action) => {
      console.log(
        "courseContentTemplateSlice -- addCourseSection",
        action.payload
      );
      let data = state.entities[action.payload.courseId]; // first get the id from the entity.

      if (!data) {
        console.log(
          `course content Template Profile for course id ${action.payload.courseId} data not found, adding new entry`
        );
        templateAdapter.addOne(state, {
          _id: action.payload.courseId,
          sections: [],
        });
        data = state.entities[action.payload.courseId];
        console.log(data);
      }
      data.sections.push({
        id: nanoid(),
        title: action.payload.title,
        topics: [],
      });
      templateAdapter.upsertOne(state, data);
    },

    addCourseTopic: (state, action) => {
      // first we will get the data for the given course
      let data = state.entities[action.payload.courseId];

      // we need to get the section from the current course.
      const section = data.sections.find(
        (section) => section.title === action.payload.sectionId
      );

      // if section is present then we need to add/update the section.
      if (section) {
        const newTopic = {
          id: nanoid(),
          title: action.payload.title,
          topics: [],
        };

        console.log("section updated: ", data);
        templateAdapter.upsertOne(state, data);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(postCourseTemplate.fulfilled, (state, action) => {
      console.log("add section response: ", action.payload);
    });
  },
});

export const { addCourseSection, addCourseTopic } =
  courseContentTemplateSlice.actions;

export default courseContentTemplateSlice.reducer;

export const {
  selectAll: selectAllCourseTemplate,
  selectById: selectCourseTemplateById,
} = courseAdapter.getSelectors((state) => state.courseContentTemplate);

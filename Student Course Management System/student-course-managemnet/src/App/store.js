import { configureStore } from "@reduxjs/toolkit";
import studentSliceReducer from "../features/studentSlice/studentSlice";
import courseSliceReducer from "../features/courseSlice/courseSlice";
import courseCategorySliceReducer from "../features/courseCategory/courseCategorySlice";
import courseContentTemplateReducer from "../features/courseContentTemplate/courseContentTemplateSlice";
import courseSectionsReducer from "../features/courseContentTemplate/courseSectionsSlice";
import courseTopicReducer from "../features/courseContentTemplate/courseTopicSlice";
import CourseProfileReducer from "../features/studentSlice/StudentProfile/CourseProfileSlice";
import SectionProfileReducer from "../features/studentSlice/StudentProfile/SectionProfileSlice";
import TopicProfileReducer from "../features/studentSlice/StudentProfile/TopicProfileSlice";
import appReducer from "./appSlice";

export const store = configureStore({
    reducer: {
        students: studentSliceReducer,
        courses: courseSliceReducer,
        courseCategories: courseCategorySliceReducer,
        courseContentTemplate: courseContentTemplateReducer,
        courseSections: courseSectionsReducer,
        courseTopic: courseTopicReducer,
        studentCourseProfile: CourseProfileReducer,
        studentSectionProfile: SectionProfileReducer,
        studentTopicProfile: TopicProfileReducer,
        app: appReducer
    }
})

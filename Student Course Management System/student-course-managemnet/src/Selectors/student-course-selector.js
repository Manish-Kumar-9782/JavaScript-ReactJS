import { getStudentCourseSectionById } from "../features/studentSlice/StudentProfile/SectionProfileSlice";
import { getSectionById } from "../features/courseContentTemplate/courseSectionsSlice";
import { getTopicById } from "../features/courseContentTemplate/courseTopicSlice";
import { getStudentTopicById } from "../features/studentSlice/StudentProfile/TopicProfileSlice";
import { getCourseProfileById } from "../features/studentSlice/StudentProfile/CourseProfileSlice";
import { getCourseById } from "../features/courseSlice/courseSlice";
import { createSelector } from "@reduxjs/toolkit";

/**
 * getTopicById:: to get the topic template data from the courseTopicSlice.
 * getStudentTopicById:: to get the student topic data from individual student profile.
 * 
 * getStudentCourseSectionById:: to get the student course section from the student section collections.
 * 
 * getSectionById:: to get the course template from the course section collections
 * 
 * Note: the value of the getSectionById will be common for all students but the value from getStudentCourseSectionById will be individual to each student.
 */

export const selectCourseProfileById = createSelector(
    (state, courseId) => {
        // Note This courseId must be from the student courseProfile
        const courseProfile = getCourseProfileById(state, courseId);

        // Now we need to get the courseProfile Template data.
        const courseTemplate = getCourseById(state, courseProfile?.courseId)

        return { ...courseTemplate, ...courseProfile }
    },
    (data) => data
)



export const selectStudentCourseSectionsById = createSelector(
    (state, sectionId) => {
        // first we will select the section from the student data.
        const sectionData = getStudentCourseSectionById(state, sectionId)

        // Now after getting the section id we need to get the section template data.
        const sectionTemplate = getSectionById(state, sectionData?.sectionId)

        return { sectionData, sectionTemplate }
    },

    (data) => {
        return { ...data.sectionTemplate, ...data.sectionData, topicIds: data.sectionTemplate?.topics }
    }
)


export const selectStudentCourseTopicById = createSelector(
    (state, topicId) => {
        // this topic id must be from course topic template

        // not from the topic templates.
        const topicData = getStudentTopicById(state, topicId);

        // Now after getting the topicData we can get the topic template data.
        const topicTemplate = getTopicById(state, topicId);

        return { state, topicData, topicTemplate };
    },
    (data) => {
        const topicProfile = { ...data.topicTemplate, ...data.topicData }

        // const subTopics = topicProfile.subTopics?.map(topicId => {
        //     return data.state.studentTopicProfile.entities[topicId]
        // })
        return [topicProfile, topicProfile.topics]
    }
)





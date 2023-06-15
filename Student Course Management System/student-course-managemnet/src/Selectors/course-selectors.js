import { createSelector } from "@reduxjs/toolkit";
// A selector to select all the section id from the state.


export const selectAllSectionIds = createSelector(
    (state) => state.courseSections.ids,
    (ids) => ([...ids]))


export const selectSectionById = createSelector(
    (state, sectionId) => state.courseSections.entities,
    (state, sectionId) => sectionId,
    (entities, sectionId) => entities[sectionId]
)


export const getAddCourseTopicData = createSelector(
    (state, sectionId) => {
        return {
            addTopicStatus: state.courseTopic.addTopic,
            newTopicId: state.courseTopic.newTopicId,
            sectionId: state.courseTopic.sectionId
        }
    },

    (state, sectionId) => sectionId,

    (data, sectionId) => {
        data.sectionId === sectionId ? data.action = true : data.action = false
        return data;
    }
)
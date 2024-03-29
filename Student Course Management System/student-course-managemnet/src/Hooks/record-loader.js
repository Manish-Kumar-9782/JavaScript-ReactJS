import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StudentIdError, CourseIdError } from "../Custom Errors/ValueError";
import { updateCurrentStudentId, updateCurrentCourseProfileId, reloadStatus, resetAppReload, resetCourseDataReload } from "../App/appSlice";
// Student Course Profile Slice Imports
import { getSectionProfileStatus, fetchStudentSectionProfile, resetSectionProfileStatus, updateSectionProfileReloadStatus } from "../features/studentSlice/StudentProfile/SectionProfileSlice";

import { getTopicProfileStatus, fetchStudentTopicProfile, resetTopicProfileStatus, updateTopicProfileReloadStatus } from "../features/studentSlice/StudentProfile/TopicProfileSlice";
import { getCourseProfileStatus, fetchStudentCourseProfile, resetCourseProfileStatus, updateCourseProfileReloadStatus } from "../features/studentSlice/StudentProfile/CourseProfileSlice";

// Course Template Profile Slice Imports
import { getCourseStatus, fetchCourse } from "../features/courseSlice/courseSlice";

import {
    getCourseSectionsStatus,
    fetchCourseSections,
    updateCourseSectionReloadStatus,
    resetCourseSectionStatus,
    addNewTopic
} from "../features/courseContentTemplate/courseSectionsSlice";

import {
    getCourseTopicStatus,
    fetchCourseTopics,
    updateCourseTopicReloadStatus,
    resetCourseTopicStatus,
    // getAddCourseTopicData,
    updateAddCourseTopicStatus
} from "../features/courseContentTemplate/courseTopicSlice";

import { getAddCourseTopicData } from "../Selectors/course-selectors";


const selectReloads = createSelector((state) => {

    const courseReload = state.app.reloadCourseData;
    const appReload = state.app.reload;
    const studentCourseReload = state.studentCourseProfile.reload;
    const studentSectionReload = state.studentSectionProfile.reload;
    const studentTopicReload = state.studentTopicProfile.reload;

    return { appReload, courseReload, studentCourseReload, studentSectionReload, studentTopicReload }
},
    (data) => data)


const selectCourseReloads = createSelector((state) => {

    const courseReload = state.app.reloadCourseData;
    const appReload = state.app.reload;
    const SectionReload = state.courseSections.reload;
    const TopicReload = state.courseTopic.reload;

    return { appReload, courseReload, SectionReload, TopicReload }
},
    (data) => data)

// ================================================================= //

export const useFetchStudentRecord = ({
    studentId,
    courseId,
    fetchStudentCourses = false,
    fetchStudentTopics = false,
    fetchStudentSection = false,
}) => {

    // first of all we need to find out the status 
    const dispatch = useDispatch();
    const studentProfileStatus = useSelector(
        getCourseProfileStatus,
        shallowEqual
    );
    const topicProfileStatus = useSelector(getTopicProfileStatus, shallowEqual);
    const sectionProfileStatus = useSelector(
        getSectionProfileStatus,
        shallowEqual
    );


    // if we have changed studentId then we will fetch the data for that student.
    useEffect(() => {
        if (studentId) dispatch(updateCurrentStudentId(studentId))
    }, [studentId, dispatch])

    // if we have changed courseId id for same or different student. then we will fetch the course data
    // like sections and the topics as well.
    useEffect(() => {
        if (courseId) dispatch(updateCurrentCourseProfileId(courseId))
    }, [courseId, dispatch])


    const { appReload, courseReload, studentCourseReload, studentSectionReload, studentTopicReload } = useSelector(selectReloads, shallowEqual);

    // if if we have changed the student id then we will dispatch the update Course Profile
    // which will force the courseProfile to make it on idle condition. 
    useEffect(() => {
        console.log("useEffect: ", { appReload, fetchStudentCourses, studentProfileStatus, studentCourseReload })
        if (appReload && fetchStudentCourses) {
            // console.log("Preparing to Reload....")
            dispatch(updateCourseProfileReloadStatus(true));
            dispatch(resetAppReload());
        }

        if (studentCourseReload === true) {
            dispatch(resetCourseProfileStatus());
        }

    }, [appReload, fetchStudentCourses, studentProfileStatus, studentCourseReload, dispatch])


    // here also we are going to change the courseId if it has changed, then we force the studentSectionSlice,
    // and studentTopicSlice to make it's status as idle which will allow to reload.
    useEffect(() => {
        if (courseReload) {
            if (fetchStudentSection) dispatch(updateSectionProfileReloadStatus(true));
            if (fetchStudentTopics) dispatch(updateTopicProfileReloadStatus(true));
            dispatch(resetCourseDataReload())
        }
    }, [courseReload, fetchStudentSection, fetchStudentTopics, dispatch])




    useEffect(() => {
        if (studentSectionReload) dispatch(resetSectionProfileStatus())
        if (studentTopicReload) dispatch(resetTopicProfileStatus())
    }, [studentSectionReload, studentTopicReload, dispatch])


    useEffect(() => {
        function loadCourse() {
            if (fetchStudentCourses && studentProfileStatus === "idle") {
                dispatch(fetchStudentCourseProfile(studentId));
                if (studentCourseReload) dispatch(updateCourseProfileReloadStatus(false));
                // console.log("Loading of StudentCourseProfile Completed..")
            }
        }

        function loadSection() {
            if (fetchStudentSection && sectionProfileStatus === "idle") {
                dispatch(fetchStudentSectionProfile(studentId));
                if (studentSectionReload) dispatch(updateSectionProfileReloadStatus(false));
            }
        }

        function loadTopic() {
            if (fetchStudentTopics && topicProfileStatus === "idle") {
                dispatch(fetchStudentTopicProfile(studentId));
                if (studentTopicReload) dispatch(updateTopicProfileReloadStatus(false));
            }
        }

        loadCourse();
        loadSection();
        loadTopic();

    }, [studentCourseReload, studentSectionReload, studentTopicReload, dispatch, fetchStudentTopics, fetchStudentCourses, fetchStudentSection, studentId, studentProfileStatus, topicProfileStatus, sectionProfileStatus]);

    // console.log("Reloading States: ", { appReload, studentCourseReload, studentSectionReload, studentTopicReload })
}

// ================================================================= //


// ================================================================= //
export const useFetchCourseTemplates = ({ courses = false, sections = false, topics = false, courseId = null }) => {
    // Note in this we courses don't need any but
    // but sections and topics need a course id to fetch.
    const dispatch = useDispatch()
    const validateCourseId = (courseId) => {
        if (!courseId) throw new CourseIdError("CourseId is required.")
    }

    // Now first we need to get the status for template slice.
    const courseStatus = useSelector(getCourseStatus, shallowEqual);
    const courseSectionsStatus = useSelector(getCourseSectionsStatus, shallowEqual);
    const courseTopicsStatus = useSelector(getCourseTopicStatus, shallowEqual);

    const { appReload, courseReload, SectionReload, TopicReload } = useSelector(selectCourseReloads)


    // Now first we need to update the reload status for sectionSlice and topicSlice
    useEffect(() => {
        if (courseReload) {
            if (sections) dispatch(updateCourseSectionReloadStatus(true));
            if (topics) dispatch(updateCourseTopicReloadStatus(true));
        }
    },
        [courseReload, sections, topics, dispatch])

    // Now if SectionReloadStatus and TopicReloadStatus are changed then we need to act with it.
    useEffect(() => {
        if (SectionReload) dispatch(resetCourseSectionStatus());
        if (TopicReload) dispatch(resetCourseTopicStatus());
    }, [SectionReload, TopicReload, dispatch])


    useEffect(() => {
        if (courses && courseStatus === 'idle') {
            dispatch(fetchCourse())
        }

        if (sections && courseSectionsStatus === 'idle') {
            try {
                validateCourseId(courseId);
                dispatch(fetchCourseSections({ courseId }))
            }
            catch (error) { }
        }

        if (topics && courseTopicsStatus === 'idle') {
            try {
                validateCourseId(courseId);
                dispatch(fetchCourseTopics(courseId))
            }
            catch (error) { }
        }
    }, [courseStatus, courseSectionsStatus, courseTopicsStatus, courseId, topics, sections, courses, dispatch])
}
// ================================================================= //

export const useAddTopicToSection = (section) => {
    // a status which will show that we are going to add a new topic to the section or not.
    // const [status, setStatus] = useState(false);
    const { addTopicStatus, newTopicId, sectionId, action } = useSelector((state) => getAddCourseTopicData(state, section?._id), shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        if (addTopicStatus === 'success' && action === true && section?._id === sectionId && newTopicId) {
            // now if adding a new topic to topic Slice has been completed then we need to add a new topic to the section.
            dispatch(addNewTopic({ sectionId: section._id, topicId: newTopicId }))
            dispatch(updateAddCourseTopicStatus({ addStatus: 'idle', topicId: null }));
            // setStatus(false);
        }
        // console.log("add New Topic status: ", ": ", section?._id, { addTopicStatus, section, newTopicId, sectionId, action })
    }, [addTopicStatus, section, sectionId, action, newTopicId, dispatch])

    // if (addTopicStatus === 'initiated') {
    //     if (!status) setStatus(true);
    // }
    // else if (addTopicStatus === 'success' && status === true && section && newTopicId) {
    //     // now if adding a new topic to topic Slice has been completed then we need to add a new topic to the section.
    //     dispatch(addNewTopic({ sectionId: section._id, topicId: newTopicId }))
    //     dispatch(updateAddCourseTopicStatus({ addStatus: 'idle', topicId: null }));
    //     setStatus(false);
    // }
    // console.log("add New Topic status: ", ": ", section?._id, { addTopicStatus, status, section, newTopicId })

}
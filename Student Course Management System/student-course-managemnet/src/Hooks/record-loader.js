import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { StudentIdError, CourseIdError } from "../Custom Errors/ValueError";
import { updateCurrentStudentId, updateCurrentCourseProfileId, reloadStatus, resetAppReload } from "../App/appSlice";
// Student Course Profile Slice Imports
import { getSectionProfileStatus, fetchStudentSectionProfile, resetSectionProfileStatus, updateSectionProfileReloadStatus } from "../features/studentSlice/StudentProfile/SectionProfileSlice";
import { getTopicProfileStatus, fetchStudentTopicProfile, resetTopicProfileStatus, updateTopicProfileReloadStatus } from "../features/studentSlice/StudentProfile/TopicProfileSlice";
import { getCourseProfileStatus, fetchStudentCourseProfile, resetCourseProfileStatus, updateCourseProfileReloadStatus } from "../features/studentSlice/StudentProfile/CourseProfileSlice";

// Course Template Profile Slice Imports
import { getCourseStatus, fetchCourse } from "../features/courseSlice/courseSlice";
import { getCourseSectionsStatus, fetchCourseSections } from "../features/courseContentTemplate/courseSectionsSlice";
import { getCourseTopicStatus, fetchCourseTopics } from "../features/courseContentTemplate/courseTopicSlice";


const selectReloads = createSelector((state) => {

    const courseReload = state.app.reloadCourseData;
    const appReload = state.app.reload;
    const studentCourseReload = state.studentCourseProfile.reload;
    const studentSectionReload = state.studentSectionProfile.reload;
    const studentTopicReload = state.studentTopicProfile.reload;

    return { appReload, courseReload, studentCourseReload, studentSectionReload, studentTopicReload }
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
        if (appReload) {
            if (fetchStudentCourses) dispatch(updateCourseProfileReloadStatus(true));
        }
    }, [appReload, fetchStudentCourses, dispatch])


    // here also we are going to change the courseId if it has changed, then we force the studentSectionSlice,
    // and studentTopicSlice to make it's status as idle which will allow to reload.
    useEffect(() => {
        if (courseReload) {
            if (fetchStudentSection) dispatch(updateSectionProfileReloadStatus(true));
            if (fetchStudentTopics) dispatch(updateSectionProfileReloadStatus(true));
        }
    }, [courseReload, fetchStudentSection, fetchStudentTopics, dispatch])


    // useEffect(() => {

    // }, [studentCourseReload, studentSectionReload, studentTopicReload, dispatch])


    useEffect(() => {
        function loadCourse() {
            if (fetchStudentCourses && studentProfileStatus === "idle") {
                dispatch(fetchStudentCourseProfile(studentId));
                if (studentCourseReload) dispatch(resetCourseProfileStatus());
            }
        }

        function loadSection() {
            if (fetchStudentSection && sectionProfileStatus === "idle") {
                dispatch(fetchStudentSectionProfile(studentId));
                if (studentSectionReload) dispatch(resetSectionProfileStatus());
            }
        }

        function loadTopic() {
            if (fetchStudentTopics && topicProfileStatus === "idle") {
                dispatch(fetchStudentTopicProfile(studentId));
                if (studentTopicReload) dispatch(resetTopicProfileStatus());
            }
        }

        if (studentCourseReload) loadCourse();
        if (studentSectionReload) loadSection();
        if (studentTopicReload) loadTopic();

    }, [studentCourseReload, studentSectionReload, studentTopicReload, dispatch, fetchStudentTopics, fetchStudentCourses, fetchStudentSection, studentId, studentProfileStatus, topicProfileStatus, sectionProfileStatus]);


    // Now after reloading all the profiles we need to reset the data
    useEffect(() => {
        if (appReload) {
            if (studentCourseReload === false)
                dispatch(resetAppReload());
        }

    }, [studentCourseReload, appReload, dispatch])

    console.log("Reloading States: ", { appReload, studentCourseReload, studentSectionReload, studentTopicReload })
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
}
// ================================================================= //
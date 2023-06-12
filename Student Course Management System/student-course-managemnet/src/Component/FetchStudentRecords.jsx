import React from "react";
import { useEffect } from "react";
import { getSectionProfileStatus } from "../features/studentSlice/StudentProfile/SectionProfileSlice";
import { getTopicProfileStatus } from "../features/studentSlice/StudentProfile/TopicProfileSlice";
import { getCourseProfileStatus } from "../features/studentSlice/StudentProfile/CourseProfileSlice";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchStudentCourseProfile } from "../features/studentSlice/StudentProfile/CourseProfileSlice";
import { fetchStudentSectionProfile } from "../features/studentSlice/StudentProfile/SectionProfileSlice";
import { fetchStudentTopicProfile } from "../features/studentSlice/StudentProfile/TopicProfileSlice";

// this component will be used to fetch the student record only if it is not already present
// int the locale store.

const FetchStudentRecords = ({
  student_id,
  fetchStudentCourses = false,
  fetchStudentTopics = false,
  fetchStudentSection = false,
}) => {
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

  useEffect(() => {
    if (fetchStudentCourses && studentProfileStatus === "idle") {
      dispatch(fetchStudentCourseProfile(student_id));
    }

    if (fetchStudentTopics && topicProfileStatus === "idle") {
      dispatch(fetchStudentTopicProfile(student_id));
    }

    if (fetchStudentSection && sectionProfileStatus === "idle") {
      dispatch(fetchStudentSectionProfile(student_id));
    }
  }, [dispatch, student_id]);

  return <></>;
};

export default FetchStudentRecords;

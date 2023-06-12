import React, { useEffect } from "react";
import { getStudentCourseSectionById } from "./SectionProfileSlice";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getSectionById } from "../../courseContentTemplate/courseSectionsSlice";
import StudentSectionTopic from "./StudentSectionTopic";
import { useParams } from "react-router-dom";
import { patchStudentTopicProfile } from "./TopicProfileSlice";
import { selectStudentCourseSectionsById } from "../../../Selectors/student-course-selector";
//============================================================================//

// @Component: StudentCourseSections
const StudentCourseSection = ({ section_id }) => {
  const dispatch = useDispatch();
  const { student_id, course_id } = useParams();

  const sectionData = useSelector(
    (state) => selectStudentCourseSectionsById(state, section_id),
    shallowEqual
  );

  // Note: here studentSection contains the individual data about courseSection of that student.
  // Where section is the common from courseSections.

  const onTopicCheck = (event, topicId, data) => {
    const content = {
      studentId: student_id,
      courseId: course_id,
      sectionId: sectionData._id,
      topicId: topicId,
      data,
    };
    console.log("onTopicCheck Data: ", content);
    dispatch(patchStudentTopicProfile(content));
  };

  console.log("from Student Course Section: ", sectionData);

  return (
    <>
      <section className="p-2 my-3 border">
        <div>
          <h4 className="text-secondary">{sectionData?.title}</h4>
          {sectionData &&
            sectionData.topicIds?.map((topic_id) => {
              // console.log("topics: ", topic);
              return (
                <StudentSectionTopic
                  key={topic_id}
                  topicId={topic_id}
                  onCheck={onTopicCheck}
                />
              );
            })}
        </div>
      </section>
    </>
  );
};

export default StudentCourseSection;

import React, { useEffect, useState } from "react";
import { getTopicById } from "../../courseContentTemplate/courseTopicSlice";
import { getStudentTopicById } from "./TopicProfileSlice";
import { shallowEqual, useSelector } from "react-redux";
import { selectStudentCourseTopicById } from "../../../Selectors/student-course-selector";
import { Form } from "react-bootstrap";
import { useFetchStudentRecord } from "../../../Hooks/record-loader";
import { useParams } from "react-router-dom";

//============================================================================//

// @Component: StudentSectionTopic
const StudentSectionTopic = ({ topicId, onCheck }) => {
  const [checked, setChecked] = useState(false);
  const { studentId } = useParams();

  const [topicProfile, subTopics] = useSelector(
    (state) => selectStudentCourseTopicById(state, topicId),
    shallowEqual
  );

  useEffect(() => {
    if (topicProfile)
      setChecked(topicProfile.status === "checked" ? true : false);
  }, []);

  console.log(`Student Section Topic`, { topicProfile, subTopics });
  return (
    <div>
      {topicProfile && (
        <>
          <div className="d-flex justify-content-between">
            <Form.Check
              type="checkbox"
              id={topicId}
              label={topicProfile.title}
              disabled={topicProfile ? false : true}
              checked={checked}
              onChange={(e) => {
                onCheck(e, topicProfile._id, { checked: !checked });
                setChecked(!checked);
              }}
            />
            {topicProfile ? topicProfile.status : "not available"}
          </div>

          <div className="px-2">
            {subTopics?.map((topicId) => (
              <StudentSectionTopic
                key={topicId}
                topicId={topicId}
                onCheck={onCheck}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentSectionTopic;

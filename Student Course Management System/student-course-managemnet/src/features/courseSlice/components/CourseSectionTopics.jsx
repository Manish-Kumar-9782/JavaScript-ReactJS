import React from "react";
import CourseTemplateTopic from "../../courseContentTemplate/CourseTemplateTopic";
const CourseSectionTopics = ({ section, showModal }) => {
  return (
    <div className="border ps-2">
      <ul type="none" className="list-group px-2 py-2">
        {section?.topics?.map((topic_id) => (
          <CourseTemplateTopic
            key={topic_id}
            topicId={topic_id}
            onAddClick={() => showModal(true)}
          />
        ))}
      </ul>
    </div>
  );
};

const CourseSectionTopicMap = React.memo(CourseSectionTopics);

export default CourseSectionTopicMap;

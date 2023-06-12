import asyncHandler from "express-async-handler"
import { courseTopicTemplateModal, courseSectionTemplateModal } from "../models/CourseSections.js"
import { CourseModel } from "../models/Course.js"



const validateTopicPath = async (courseId, sectionId) => {

    const course = await CourseModel.findById(courseId);

    if (!course) return { course: false, section: false }

    const section = await courseSectionTemplateModal.findById(sectionId);

    if (!section) return { course: true, section: false }

    return { course, section };
}

const onValidationFailed = (course, courseId, section, sectionId, res) => {
    if (!course) return res.status(404).json({ error: 'There is no course found by id ' + courseId })

    if (!section) return res.status(404).json({ error: `There is no section found by id ${sectionId} within the course id ${courseId}` })
}


const getallTopics = async ({ courseId, sectionId, res }) => {

    if (courseId && sectionId) {
        const course = await CourseModel.findById(courseId);
        if (!course) res.status(404).json({ error: `Course not found for id ${courseId}` })

        const section = await courseSectionTemplateModal.find({ _id: sectionId, courseId });
        if (!section) res.status(404).json({ error: `section not found for id ${sectionId} into the course by id ${courseId}` })

        const topics = await courseTopicTemplateModal.find({ sectionId: sectionId });
        return res.send(topics)
    }
    else if (courseId) {
        const course = await CourseModel.findById(courseId);
        if (!course) return res.status(404).json({ error: `Course not found for id ${courseId}` })
        console.log(`\nCourse sections: ${course.sections}\n`)
        const topics = await courseTopicTemplateModal.find().where("sectionId").in(course.sections).exec();
        return res.send(topics)
    }
}

const getTopicById = async ({ topicId, res }) => {

    if (!topicId) res.status(404).json({ error: `ValueError: Topic Id required..` })

    // Now if we have topicId then get the data from database.
    const topic = await courseTopicTemplateModal.findById(topicId);
    if (!topic) res.status(404).json({ error: `Topic by id ${topicId} not found` })
    return res.send(topic);
}


//-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-//

const addSubTopic = async (topicId, topic, res) => {
    try {
        const __topic = await courseTopicTemplateModal.findById(topicId);
        if (!__topic) return res.status(404).json({ error: `Unable to insert a new sub topic to a topic by id ${topicId}, Topic Not Found!` });
        __topic.topics.push(topic._id);
        __topic.save();
        return res.json({ data: topic, message: "A sub topic has been inserted successfully to a topic by id " + topicId + "." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


//================================================//
export const getTopics = asyncHandler(async (req, res) => {
    const { courseId, sectionId, topicId } = req.params;

    const { course, section } = await validateTopicPath(courseId, sectionId);

    if (course && section) {
        if (topicId) {
            const res_topic = await courseTopicTemplateModal.findById(topicId);
            if (!res_topic) return res.status(404).json({ error: 'Topic not found by id: ' + topicId })
            return res.send(res_topic);
        }

        const res_topics = await courseTopicTemplateModal.find().where("_id").in(section.topics).exec();
        return res.send(res_topics);

    } else {
        return onValidationFailed(course, courseId, section, sectionId, res)
    }
})
//================================================//


//================================================//
// add a new topic to a given section within the course
export const addTopic = asyncHandler(async (req, res) => {
    const { courseId, sectionId, topicId } = req.params;
    const { course, section } = await validateTopicPath(courseId, sectionId);


    if (course && section) {
        // console.log(course)
        // console.log(section)
        const { title } = req.body;
        if (!title) return res.status(406).json({ error: 'title required.' })
        // create a new instance of courseTopicTemplateModal
        const topic = new courseTopicTemplateModal({ title, sectionId })
        if (topic) {
            try {
                // topic.validate();
                topic.save();

                if (topicId) {
                    return addSubTopic(topicId, topic, res)
                }
                else {
                    section.topics.push(topic._id);
                }

                section.save();
                return res.json({ data: topic, message: `A topic has been inserted successfully to a section by id ${sectionId}.` })
            }
            catch (error) {
                return res.status(500).json({ error: error.message })
            }
        }
        return res.status(500).json({ error: `Unable to create a new Topic.` })

    }

    return onValidationFailed(course, courseId, section, sectionId, res)

})
//================================================//


//================================================//
// delete a topic from a section or id

export const deleteTopic = asyncHandler(async (req, res) => {

    const { courseId, sectionId, topicId } = req.params;
    const { from_id, subtopic } = req.query;


    const { course, section } = await validateTopicPath(courseId, sectionId);




    if (course && section) {
        // if want to delete a topic from a topic then we need a 
        // from_id, and subtopic as true as the query string parameters.
        console.log("Delete Topic Parameters: ", req.params);
        console.log("Delete topic Query Parameters: ", req.query);
        const topic = await courseTopicTemplateModal.findById(topicId);

        if (subtopic === 'true' && from_id) {
            // if we have subtopic to delete then we need a parent topic id.
            const __topic = await courseTopicTemplateModal.findById(from_id);

            if (!__topic) return res.status(404).json({ message: `No parent topic found by id ${from_id} for subtopic by id ${topicId}` })

            if (!topic) return res.status(404).json({ error: `No topic found by id ${topicId} into a topic by id ${from_id}.` });

            try {
                await courseTopicTemplateModal.deleteOne({ _id: topicId }).exec();
                __topic.topics = __topic.topics.filter(item => item !== topicId);
                __topic.save();
                res.json({ message: `A Topic with id ${topicId} has been deleted successfully.` })
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }

        if (!topic) return res.status(404).json({ error: `No topic found by id ${topicId} into a Section by id ${sectionId}.` });


        try {
            courseTopicTemplateModal.deleteOne({ _id: topicId })
            section.topics = section.topics.filter(item => item !== topicId)
            section.save();
            res.json({ message: `A Topic with id ${topicId} has been deleted successfully.` })
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }


        return res.send('sent');
    }

    return onValidationFailed(course, courseId, section, sectionId, res);
})

//================================================//


//================================================//
export const getCourseData = (req, res) => {
    // this method is general purpose method to get the data
    // based on the query string parameters.
    /**
     * valid parameters:
     *  sectionId - to determine for which section we need to get the data, 
     *              if only sectionId is provided then return only section data.
     *              if sectionId with topicId is provided then it will get the topic from 
     *              given section.
     * 
     *  topicId - to determine that which topic we need to get.
     *  get - this parameter tells that what data we want by using the above information.
     *      valid values for get - section and topic
     * 
     *  1. if no sectionId and topicId is specified all available sections and topics within the sections.
     *  2. if only sectionId is specified then it will return all the available topics inside that sections
     * 
     *  3. if get is also specified with sectionId or topicId then we will get only asked data.
     * 
     */


    const { sectionId, topicId, get } = req.query;
    const { courseId } = req.params;

    if (!get) return res.status(406).json({ error: 'required get with the combination of sectionId and topicId parameters' })

    switch (get) {
        case 'topic':
            if (!topicId) return getallTopics({ courseId, sectionId, res })
            else return getTopicById({ topicId, res })
    }
}
//================================================//

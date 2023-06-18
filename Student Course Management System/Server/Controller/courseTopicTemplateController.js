import asyncHandler from "express-async-handler"
import { courseTopicTemplateModal, courseSectionTemplateModal } from "../models/CourseSections.js"
import { CourseModel } from "../models/Course.js"
import { CourseNotFound, SectionNotFound, TopicNotFound, KeyRequired } from "../handlers/ErrorHandlers.js"



const responseHttp404Handler = (error, res) => {

    if (error instanceof CourseNotFound) {
        res.status(error.httpStatusCode).send(`CourseNotFound::${error.message} (id:${error.itemId})`)
    }
    else if (error instanceof SectionNotFound) {
        res.status(error.httpStatusCode).send(`SectionNotFound::${error.message} (id:${error.itemId})`)
    }
    else if (error instanceof TopicNotFound) {
        res.status(error.httpStatusCode).send(`TopicNotFound::${error.message} (id:${error.itemId})`)
    }
    else if (error instanceof KeyRequired) {
        res.status(error.httpStatusCode).send(error.message);
    }
    else {
        res.status(500).send("Internal Server Error")
    }
}



const validateTopicPath = async (courseId, sectionId) => {

    if (!courseId || courseId === "undefined") throw new KeyRequired("CourseId", "Course id must be provided, found " + courseId)

    if (!sectionId || sectionId === "undefined") throw new KeyRequired("SectionId", "Section id must be provided, found " + sectionId)

    const course = await CourseModel.findById(courseId);

    if (!course) throw new CourseNotFound("There is no course found by given id.", courseId)

    const section = await courseSectionTemplateModal.findById(sectionId);

    if (!section) throw new SectionNotFound("There is no section found by given id.", sectionId)

    return { course, section };
}



const getallTopics = async ({ courseId, sectionId, res }) => {

    if (courseId && sectionId) {
        const { course, section } = validateTopicPath(courseId, sectionId)

        const topics = await courseTopicTemplateModal.find({ sectionId: sectionId });
        return res.send(topics)
    }
    else if (courseId) {
        const course = await CourseModel.findById(courseId);
        if (!course) throw new CourseNotFound("There is no such course found by given id", courseId);
        const topics = await courseTopicTemplateModal.find()
            .where("sectionId").in(course.sections).exec();
        return res.send(topics)
    }
}

const getTopicById = async (topicId) => {

    if (!topicId) throw new KeyRequired("TopicId", "Topic id must be provided, got " + topicId)

    // Now if we have topicId then get the data from database.
    const topic = await courseTopicTemplateModal.findById(topicId);
    if (!topic) throw new TopicNotFound("There is not topic found by given id.", topicId)
    return topic;
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

    /**
     *  This api request method will get the courseId, sectionId, and topicId to find the 
     * correct topic and topics related to the course or section using their ids.
     * 
     * if we don't have topic then we will return all topics for given course and section.
     * 
     * if we have a topic id then we will return only a single topic.
     */

    const { courseId, sectionId, topicId } = req.params;

    try {
        const { course, section } = await validateTopicPath(courseId, sectionId);

        if (topicId) {
            const res_topic = await getTopicById()
            return res.send(res_topic);
        }
        const res_topics = await courseTopicTemplateModal.find().where("_id").in(section.topics).exec();
        return res.send(res_topics);

    } catch (e) {
        responseHttp404Handler(e, res);
    }
})
//================================================//


//================================================//
// add a new topic to a given section within the course
export const addTopic = asyncHandler(async (req, res) => {
    /**
     * This api request method will take the courseId, sectionId, and topicId, this will handle the
     * adding new topic to a section or inside a topic as subtopic,
     * 
     * if we don't have any topic id then it means we only add a topic to the sectionTemplate.
     * 
     * if we have topicId then we will add a new topic to the to that topic.
     * 
     */

    const { courseId, sectionId, topicId } = req.params;

    try {
        const { course, section } = await validateTopicPath(courseId, sectionId);

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

    } catch (e) {
        responseHttp404Handler(e, res);
    }

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
export const updateTopic = asyncHandler(async (req, res) => {

    const { courseId, sectionId, topicId } = req.params;
    console.log("updating topic data: ", req.body);
    try {
        // Now first of all we need to get the section from that sectionId.
        const { course, section } = await validateTopicPath(courseId, sectionId)
        // Now if we have both of them then we need to get the topic.

        const { points, difficultyLevel, isAdditional, isOptional, title } = req.body.topic;
        const updates = { points, difficultyLevel, isAdditional, isOptional, title };
        const response = await courseTopicTemplateModal.findByIdAndUpdate(topicId, updates,
            { returnDocument: 'after' }).exec();

        console.log("updated response: ", response);
        // Now we have the topic so we need to update it
        if (!response) throw new TopicNotFound("Topic not found", topicId);

        return res.json({ message: 'topic updated', data: response });
    } catch (e) {
        // 
        console.error(e)
        responseHttp404Handler(e, res);
    }
    finally {
        return
    }

})

//================================================//
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

    try {
        switch (get) {
            case 'topic':
                if (!topicId) return getallTopics({ courseId, sectionId, res })
                else return getTopicById({ topicId, res })
        }
    } catch (error) {
        responseHttp404Handler(error, res);
    }
}
//================================================//

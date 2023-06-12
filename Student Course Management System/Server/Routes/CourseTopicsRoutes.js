import express from 'express';

export const TopicRouter = express.Router();
import { getTopics, addTopic, deleteTopic, getCourseData } from '../Controller/courseTopicTemplateController.js';


//path: courses/:courseId/sections/:sectionId/topics
TopicRouter.route("/:courseId/sections/:sectionId/topics")
    .get(getTopics)
    .delete()
    .post(addTopic)

TopicRouter.route("/:courseId/sections/:sectionId/topics/:topicId")
    .get(getTopics)
    .delete(deleteTopic)
    .post(addTopic)

TopicRouter.route("/:courseId/fetch/")
    .get(getCourseData)

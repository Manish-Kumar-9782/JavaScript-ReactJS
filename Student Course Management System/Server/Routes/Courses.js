import express from "express"
import {
    addCourse, getCourses, deleteCourse,
    getCourseByCourseId
} from "../Controller/courseController.js";
import { addCourseSection, getCourseSection, getCourseSectionById, deleteCourseSectionById } from "../Controller/courseSectionTemplateController.js";
export const courseRouter = express.Router();
export const courseIdRouter = express.Router();



courseIdRouter.route("/:courseId/sections/:sectionId")
    .get(getCourseSectionById)
    .delete(deleteCourseSectionById)


courseIdRouter.route("/:courseId/sections/")
    .post(addCourseSection)
    .get(getCourseSection)


courseRouter.route("/")
    .get(getCourses)
    .post(addCourse)
    .delete(deleteCourse)

courseRouter.route("/:courseId")
    .get(getCourseByCourseId)
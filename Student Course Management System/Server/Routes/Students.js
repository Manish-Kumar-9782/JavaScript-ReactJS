import express from "express";
import { getAllStudents, addStudent } from "../Controller/studentsController.js";
// import { addStudent } from "../Controller/studentsController.js";
import { getStudentCourseProfile, getStudentProfile, patchStudentSectionProfile } from "../Controller/studentCourseProfileController.js";


export const studentRouter = express.Router();


studentRouter.route("/")
    .get(getAllStudents)
    .post(addStudent)


studentRouter.route("/:studentId")
    .get(getStudentProfile)


studentRouter.route("/:studentId/api/")
    .get(getStudentCourseProfile)

studentRouter.route("/:studentId/course/:courseId/section/:sectionId/topic/:topicId")
    .patch(patchStudentSectionProfile)
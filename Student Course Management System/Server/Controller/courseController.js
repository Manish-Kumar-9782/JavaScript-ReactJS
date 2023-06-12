import { CourseModel } from "../models/Course.js";
import { courseCategoriesModel } from "../models/CourseCategoriesModel.js";
import asyncHandler from "express-async-handler"


export const addCourse = asyncHandler(async (req, res) => {

    const { name, category, regularDuration, extendedDuration, courseLevels } = req.body;

    console.log({ name, category, regularDuration, extendedDuration, courseLevels })



    const courseCategory = await courseCategoriesModel.findById(category);
    console.log(courseCategory)
    console.log("type of courseCategory result: ", typeof courseCategory)
    console.log("type of courseCategory courses: ", courseCategory.courses, typeof courseCategory.courses, courseCategory.courses instanceof Array)

    const newCourse = new CourseModel({ name, category, regularDuration, extendedDuration, courseLevels })

    if (newCourse) {

        // if newCourse instance is created then we will process ahead
        // Now retrieve the courseCategory instance which is coming from the form
        if (courseCategory) {
            const query = await courseCategoriesModel.updateOne({ _id: category }, { courses: [...courseCategory.courses, newCourse._id] }).exec();
            if (query.acknowledged) {
                // if we have updated the courseCategory successfully then we will save the newCourse entry
                await newCourse.save();
                res.status(200).json({ message: "Course Created successfully", entity: newCourse })
            }
            else {
                res.status(400).json({ error: "Unable to create new course Entry..!" })
            }
        } else {
            res.status(404).json({ error: `${category} is not a valid course category` })
        }
    }
    else {
        res.status(400).json({ error: "unable to create new course document." })
    }
})

// get Courses 
export const getCourses = asyncHandler(async (req, res) => {
    const response = await CourseModel.find()
    res.json(response)
})

// delete course
// =================================================================== //
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log("Delete request body: ", req.body);
    // first we need to find out the course with that id.
    const response = await CourseModel.findById({ _id: id }).exec(); // executing the query.
    console.log(response)
    // if we have got the course with that id then we will delete it.
    if (response) {
        const result = await response.deleteOne();
        console.log("delete Result: ", result);
        if (result) {
            res.status(200).json({ message: `Course with id ${id} was deleted.`, entity: result })
        }
        else {
            res.status(404).json({ message: `Course with id ${id} Not found.` })
        }
    }
    else {
        res.status(404).json({ error: `Course with '${id}' is not found..` })
    }
})


//================================== /:courseId Route / =========================//

export const getCourseByCourseId = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const response = await CourseModel.findById({ _id: courseId })

    if (response) {
        return res.send(response)
    }
    return res.status(404).json({ message: "No Course found with id " + courseId })
})
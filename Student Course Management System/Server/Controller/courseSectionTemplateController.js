import asyncHandler from "express-async-handler"
import { courseSectionTemplateModal } from "../models/CourseSections.js"
import { CourseModel } from "../models/Course.js"

//========================================================================================//
export const addCourseSection = asyncHandler(async (req, res) => {
    // first of all we need to get the id.
    const courseId = req.params.courseId;

    const { title } = req.body;

    if (title && courseId) {

        // first we will create a new Course Section
        const response = await new courseSectionTemplateModal({
            title, courseId
        })

        // Now we will get the Course By Id
        const course = await CourseModel.findById(courseId)

        if (response && course) {
            console.log("course: ", course)
            course.sections.push(response._id)
            course.save();
            response.save();
            res.status(200).send({ data: response, message: `Course Section with id  ${response._id} has been added.` });
        }
    }
    else {
        return res.status(400).json({ message: "title and courseId both required..!" })
    }

    return res.status(400).json({ message: "Unable to add a new course section.." })
})
//========================================================================================//


//========================================================================================//
export const getCourseSection = asyncHandler(async (req, res) => {
    // in this we will return all the course sections
    // from a given id
    const { courseId } = req.params;
    // Now first we need to get the course  from the database 
    const response = await CourseModel.findById(courseId);

    // Now if id is not found then send an 400 status with message 
    if (!response) return res.status(400).json({ message: "Course not found..." })

    // Now if the course is found then we need to get the sections from the course.
    if (response.sections.length === 0) return res.status(200).json({ data: [], message: "No Section Available At this time." })

    // Now if we have section then we need to return sections
    const sections = await courseSectionTemplateModal.find().where("_id").in(response.sections).exec()
    return res.status(200).send({ data: sections })
})//========================================================================================//



//========================================================================================//
export const getCourseSectionById = asyncHandler(async (req, res) => {
    const { courseId, sectionId } = req.params;

    // first we need to get the section 
    const course = await CourseModel.findById(courseId);

    if (course) {
        // NOw if course is found then we need to get the section form 
        // that course
        const section = await courseSectionTemplateModal.findById(sectionId)
        if (section) {
            // if section is found then we need to return the section.
            return res.send(section)
        }
        return res.status(404).json({ error: `No Section found by id ${courseId} in course ${sectionId}` })
    }

    return res.status(404).json({ error: `Course not found by ${courseId}` })

})
//========================================================================================//


//================================================================================//

// delete a course section by Id
export const deleteCourseSectionById = asyncHandler(async (req, res) => {
    const { courseId, sectionId } = req.params;

    // first get the course by id 
    const course = await CourseModel.findById(courseId);

    if (!course) {
        return res.status(404).json({ error: 'Course not found' });
    }

    // get the section by id 
    const section = await courseSectionTemplateModal.findById(sectionId);

    if (!section) {
        return res.status(404).json({ error: `No section found with id ${sectionId} inside the course by id ${sectionId}` })

    }

    // delete the section 

    try {
        const sec = await courseSectionTemplateModal.deleteOne({ _id: sectionId }).exec();
        console.log(sec, section)
        course.sections = course.sections.filter(section => section !== sectionId)
        course.save()
        return res.json({ data: section, message: 'section deleted successfully' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
})

//================================================================================//

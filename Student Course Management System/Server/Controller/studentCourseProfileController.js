import { StudentModel } from "../models/Student.js";
import { StudentsCoursesModal, StudentsSectionsModal } from "../models/StudentCourseModal.js";
import asyncHandler from 'express-async-handler';



const getStudent = async (studentId) => {
    const studentProfile = await StudentModel.findById({ _id: studentId }).exec()
    if (!studentProfile) return Promise.reject(new Error(`Student ${studentId} not found`))
    return studentProfile;
}

const getCourses = async (studentId) => {
    const response = await StudentsCoursesModal.find({ studentId: studentId }).exec()
    if (!response) return []
    return response
}

const getSections = async (studentId) => {
    // first we will get the course Profiles then we will get the sections
    const courseProfiles = await getCourses(studentId);
    const sectionIds = []
    courseProfiles.forEach(course => {
        course.sections.map(section => sectionIds.push(section.sectionId))
    })
    // console.log("Getting Student Course Profile sections from courses: ", courseIds)
    const response = await StudentsSectionsModal.find().where("_id").in(sectionIds).exec();
    if (!response) return []
    return response
}

const getTopics = async (studentId) => {
    const sectionProfiles = await getSections(studentId);
    // Now if the sectionProfile length is greater than 0 then only we will 
    // get the topic profiles.
    let topicProfiles = []
    if (sectionProfiles.length > 0) {
        topicProfiles = sectionProfiles.map(profile => profile.topics)
        return topicProfiles.flat()
    }
    return topicProfiles
}

// =================================================================//

export const getStudentProfile = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    // first we need to get the student profile
    const response = await getStudent(studentId)
    res.send(response)
})


export const getStudentCourseProfile = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { get } = req.query;

    try {
        if (get === 'courseProfile') {
            //Now we need to get all the course profiles which are contained by students.
            const courseProfiles = await getCourses(studentId);
            return res.send(courseProfiles)
        }
        else if (get === 'sectionProfile') {
            const sectionProfiles = await getSections(studentId);
            // getting the section profiles.
            return res.send(sectionProfiles)
        }
        else if (get === 'topicProfile') {
            const topicProfiles = await getTopics(studentId);
            return res.send(topicProfiles)
        }
    }
    catch (error) {
        console.error(error.message)
        console.error(error.stack)
        return res.status(500).json({ error: error.message })
    }

})

export const patchStudentSectionProfile = asyncHandler(async (req, res) => {
    const { studentId, courseId, sectionId, topicId } = req.params;

    console.log({
        studentId, courseId, sectionId, topicId, data: req.body
    })

    const response = await StudentsSectionsModal.findById({ _id: sectionId })
    // console.log("Section Profiles: ", response)

    const topic = response.topics.find(topic => topic._id == topicId)
    topic.status = req.body.checked ? 'checked' : 'unchecked';
    // console.log("Updated Section Profiles: ", response)
    response.save();

    return res.send("received student section profile path data.")
})
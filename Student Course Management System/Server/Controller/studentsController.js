import { StudentModel } from "../models/Student.js";
import { StudentsCoursesModal, StudentsSectionsModal } from "../models/StudentCourseModal.js";
import { CourseModel } from "../models/Course.js";
import { courseSectionTemplateModal, courseTopicTemplateModal } from "../models/CourseSections.js";
import asyncHandler from 'express-async-handler';



const buildCourseProfile = async (courseId) => {
    /** This function will generate a courseProfile for each individual Student, it will add 
     * each Course assigned for that particular student to database with its associated sections and sections topics with additional attributes.
     *
     * all the course profiles will be generated by taking the reference from Courses Modal, Sections Modal and topics Modal.
     */

    // first get the course:
    const course = await CourseModel.findById({ _id: courseId }).exec();
    console.log(`is course ${courseId}: `, course)
    if (!course) throw new Error(`Course ${courseId} does not exist`)
    return course
}

const buildCourseProfileSections = async (course) => {

    // Now we have the course, we need to fetch all the sectionId with associated course.
    const allSections = await courseSectionTemplateModal.find({ courseId: course._id })
    // console.log("Courses sections found: ", allCourses)
    return allSections
}

const buildCourseProfileTopics = async (section) => {
    const allTopics = await courseTopicTemplateModal.find({ sectionId: section._id })
    return allTopics
}

export const getAllStudents = asyncHandler(async (req, res) => {
    const students = await StudentModel.find()
    res.json(students);
})

export const addStudent = asyncHandler(async (req, res) => {
    const { Name, FatherName, Number, Courses } = req.body;

    if (!Name || !FatherName || !Number || !Courses) {
        console.log("received student data: ", req.body)
        console.log("Error: missing some required fields...")
        return res.status(406).json({ message: "studentName, studentFatherName, studentNumber and courses are required." });
    }

    console.log("creating student profile with data: ", req.body)

    // Now we will use the Promise.all method to use each Promise
    // received from buildCourseProfile
    Promise.all(Courses.map(courseId => buildCourseProfile(courseId)))
        .then(courses => {
            // here we will have the all courses selected for this student profile.
            // Now each course will have many section so we need to get those sections
            let CourseProfileData = { courses, sections: null, topics: null }
            return Promise.all(courses.map(course => buildCourseProfileSections(course)))
                .then(sections => {
                    CourseProfileData.sections = sections.flat()
                    // res.send(CourseProfileData)
                    return CourseProfileData
                })
        })
        .then(CourseProfileData => {

            return Promise.all(CourseProfileData.sections.map(section => buildCourseProfileTopics(section)))
                .then(topics => {
                    CourseProfileData.topics = topics.flat()
                    return CourseProfileData
                })
        })
        .then(CourseProfileData => {
            // Now we have courses, sections and topics
            // Now first of all we need to create a Student Profile
            console.log("CourseProfileData: ", CourseProfileData);

            const StudentProfile = StudentModel({
                Name, FatherName, Number,
                FatherNumber: req.body?.FatherNumber,
                Courses: [],
                Email: req.body?.Email
            })

            // Now we need to create a StudentCourseProfile
            const StudentCourseProfiles = Courses.map(course => {
                return StudentsCoursesModal({
                    studentId: StudentProfile._id,
                    courseId: course,
                    sections: []
                })
            })

            // after creating the StudentCourseProfile we need to create a section Profiles
            const StudentSectionProfiles = CourseProfileData.sections.map(section => {
                return StudentsSectionsModal({
                    courseId: section.courseId,
                    sectionId: section._id,
                    topics: []
                })
            })

            const topicProfiles = {}
            StudentSectionProfiles.forEach(sectionProfile => {
                // Now first of all we need to filter the section Profile
                let sectionTopics = CourseProfileData.topics.filter(
                    topic => topic.sectionId === sectionProfile.sectionId)

                sectionTopics.map(topic => topicProfiles[topic._id] = sectionProfile.topics.create({ topicId: topic._id, subTopic: [] }))

                sectionTopics.forEach(section_topic => {
                    if (section_topic.topics.length > 0) {

                        section_topic.topics.forEach(subTopicId => topicProfiles[section_topic._id].subTopics.push(topicProfiles[subTopicId]._id))
                    }
                })

                sectionTopics.map(topic => sectionProfile.topics.push(topicProfiles[topic._id]))
                // Note: here we need to 
            })


            // Now we need to update sections inside the StudentCourseProfiles
            StudentCourseProfiles.forEach(courseProfile => {
                let courseSections = StudentSectionProfiles.filter(section => section.courseId === courseProfile.courseId)

                courseSections.map(section => courseProfile.sections.push({ sectionId: section._id }))
                // inserting the Course ids mapping to the StudentProfile.Courses.
                StudentProfile.Courses.push({ courseProfileId: courseProfile._id, courseTemplateId: courseProfile.courseId })
            })

            // Now finally we need to update the Student Profile data.
            // here we need to update the Student Profile Courses.

            // console.log("\n\nSelected Course Sections: ", )
            return { StudentProfile, StudentCourseProfiles, StudentSectionProfiles, topicProfiles }

        }).then(StudentProfileData => {
            const { StudentProfile, StudentCourseProfiles, StudentSectionProfiles, topicProfiles } = StudentProfileData


            console.log("\n\n============================================================")
            console.log("Generated Course Profile: ", StudentProfileData)
            console.log("============================================================\n\n")

            StudentSectionProfiles.forEach(profile => profile.save())
            StudentCourseProfiles.forEach(profile => profile.save())
            StudentProfile.save();

            res.send({ data: StudentProfile, message: `Student Profile <${StudentProfile._id}:${StudentProfile.Name}> created successfully` })

            // res.send("Data Received Successfully")
            // res.send(StudentProfileData)
        })
        .catch(error => {
            console.log("Error in buildCourseProfile: ", error.message)
            console.log(error.stack)
            res.status(500).json(error.message)
        })
})

import mongoose from "mongoose";

const StudentCourseSchema = mongoose.Schema({
    studentId: String,
    courseId: String,
    sections: [{
        sectionId: String,
        status: {
            type: String,
            default: 'created'
        }
    }],
    status: {
        type: String,
        default: 'created'
    },
    completion: {
        type: Number,
        default: 0.0
    }
})

const StudentSectionSchema = mongoose.Schema({
    courseId: String,
    sectionId: String,
    topics: [{
        topicId: String,
        status: {
            type: String,
            default: 'created'
        },
        points: {
            type: Number,
            default: 1
        },
        subTopics: [String]
    }],
    topicIds: [String],
    status: {
        type: String,
        default: 'created'
    },
    completion: {
        type: Number,
        default: 0.0
    }
})

export const StudentsCoursesModal = mongoose.model("Students_Courses", StudentCourseSchema)

export const StudentsSectionsModal = mongoose.model("Students_Courses_Sections", StudentSectionSchema)
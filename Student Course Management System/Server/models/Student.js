import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: false
    },
    FatherName: {
        type: String,
        required: true,
    },
    Number: {
        type: String,
        required: true
    },
    FatherNumber: {
        type: String,
        required: false
    },
    Courses: {
        type: [{
            courseProfileId: String,
            courseTemplateId: String
        }],
        required: true
    },
    CourseCategory: {
        type: String,
        required: false
    },
    RegistrationDate: {
        type: Date,
        default: Date.now
    },
    CourseProfileName: {
        type: String,
        default: "Fundamental Programming"
    }
})

export const StudentModel = mongoose.model("Student", studentSchema);
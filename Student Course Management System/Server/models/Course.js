import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    regularDuration:
    {
        type: Number,
        required: true,
    },
    extendedDuration: {
        type: Number,
        required: true,
    },
    courseLevels: {
        type: [String],
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    domains: {
        type: [String],
        required: false
    },
    sections: {
        type: [String],
        required: false
    }
})

export const CourseModel = mongoose.model("Course", courseSchema);
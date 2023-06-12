import mongoose from "mongoose";

const courseCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: false
    }
})

export const courseCategoriesModel = mongoose.model("CourseCategories", courseCategoriesSchema);
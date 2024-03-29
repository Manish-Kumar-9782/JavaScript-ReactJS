import mongoose from "mongoose";


const courseSectionTemplateSchema = mongoose.Schema({
    courseId: String,
    title: String,
    isSection: {
        type: String,
        default: true
    },

    topics: [String],
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    points: {
        type: Number,
        default: 0
    },
    registeredOn: {
        type: Date,
        default: Date.now
    }
})

// courseSectionTemplateSchema
const courseTopicTemplateSchema = mongoose.Schema({
    sectionId: String,
    title: String,
    topics: [String],
    points: {
        type: Number,
        default: 1
    },
    difficultyLevel: {
        type: Number,
        default: 1
    },
    isAdditional: {
        type: Boolean,
        default: false
    },
    isOptional: {
        type: Boolean,
        default: false,
    },
})

export const courseTopicTemplateModal = mongoose.model("courseTopicModal", courseTopicTemplateSchema)

export const courseSectionTemplateModal = mongoose.model("courseSectionModal", courseSectionTemplateSchema)


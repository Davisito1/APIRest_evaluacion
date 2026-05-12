import mongoose, {Schema, Types, model} from "mongoose"

const subjectModel = new Schema({
    subjectName: {type: String},
    teacher_id: {
        type: Number
    },
    isAvailable: {type: Boolean}
}, {
    timestamps: true,
    strict: false
})

export default model("subjects", subjectModel)
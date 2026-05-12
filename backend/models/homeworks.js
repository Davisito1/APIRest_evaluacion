import {Schema, model} from "mongoose"

const homeworksModel = new Schema({
    title: {type: String},
    description: {type: String},
    dueDate: {type: Date},
    priority: {type: String},
    status: {type: Boolean}
}, {
    timestamps: true,
    strict: false
})

export default model("homeworks", homeworksModel)
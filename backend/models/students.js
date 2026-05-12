import {Schema, model} from "mongoose"

const studentsModel = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    birthdate: {type: Date},
    phone: {type: String},
    grade: {type: String},
    IsVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("students", studentsModel)
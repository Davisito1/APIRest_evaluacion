import {Schema, model} from "mongoose"

const teachersModel = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    phone: {type: String},
    speciality: {type: String},
    isActive: {type: Boolean},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date}
}, {
    timestamps: true,
    strict: false
})

export default model("teachers", teachersModel)
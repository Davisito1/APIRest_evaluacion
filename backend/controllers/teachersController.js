import teachersModel from "../models/teachers.js"

const teachersController = {}

teachersController.getTeachers = async (req, res) => {
    try {
        const teachers = await teachersModel.find()
        return res.status(200).json(Teachers)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

teachersController.updateTeacher = async (req, res) => {
    try {
        let {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            speciality,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body
        
        const teacherUpdated = await teachersModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            speciality,
            isVerified,
            loginAttempts,
            timeOut
        }, {new: true})

        if (!teacherUpdated) {
            return res.status(400).json({message: "Teacher not found"})
        }

        return res.status(200).json({message: "Teacher updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

teachersController.deteleTeacher = async (req, res) => {
    try {
        const teacherDeleted = await teachersModel.findByIdAndDelete(req.params.id)

        if (!teacherDeleted) {
            return res.status(400).json({message: "Teacher not found"})
        }

        return res.status(200).json({message: "Teacher deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default teachersController
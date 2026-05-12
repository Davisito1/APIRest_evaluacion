import studentsModel from "../models/students.js"

const studentsController = {}

studentsController.getStudents = async (req, res) => {
    try {
        const students = await studentsModel.find()
        return res.status(200).json(students)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

studentsController.updateStudent = async (req, res) => {
    try {
        let {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body
        
        const studentUpdated = await studentsModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified,
            loginAttempts,
            timeOut
        }, {new: true})

        if (!studentUpdated) {
            return res.status(400).json({message: "Student not found"})
        }

        return res.status(200).json({message: "Student updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

studentsController.deteleStudent = async (req, res) => {
    try {
        const studentDeleted = await studentsModel.findByIdAndDelete(req.params.id)

        if (!studentDeleted) {
            return res.status(400).json({message: "Student not found"})
        }

        return res.status(200).json({message: "Student deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default studentsController
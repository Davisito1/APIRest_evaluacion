import studentsModel from "../models/students.js"
import bcrypt from "bcryptjs"
import { config } from "../config.js"
import jsonwebtoken from "jsonwebtoken"

const loginStudentsController = {}

loginStudentsController.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const studentFound = await studentsModel.findOne({email})

        if (!studentFound) {
            return res.status(400).json({message: "Student not found"})
        }

        if (studentFound.timeOut && studentFound.timeOut > Date.now()) {
            return res.status(403).json({message: "Account blocked"})
        }

        const isMatch = await bcrypt.compare(password, studentFound.password)

        if (!isMatch) {
            studentFound.loginAttempts = (studentFound.loginAttempts || 0) + 1
            if (studentFound.loginAttempts >= 5) {
                studentFound.timeOut = Date.now() + 5 * 60 * 1000
                studentFound.loginAttempts = 0

                await studentFound.save()

                return res.status(403).json({message: "Accout blocked for many attempts"})
            }

            await studentFound.save()
            return res.status(401).json({message: "Wrong password"})
        }

        studentFound.loginAttempts = 0
        studentFound.timeOut = null

        const token = jsonwebtoken.sign(
            {id: studentFound._id, UserType: "student"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)

        return res.status(200).json({message: "Logged successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginStudentsController
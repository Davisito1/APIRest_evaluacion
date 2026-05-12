import subjectsModel from "../models/subjects.js"

const subjectsController = {}

subjectsController.getSubjects = async (req, res) => {
    try {
        const subjects = await subjectsModel.find()
        return res.status(200).json(subjects)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectsController.insertSubject = async (req, res) => {
    try {
        let {
            subjectName,
            teacher_id,
            isAvailable
        } = req.body

        const newSubject = new subjectsModel({
            subjectName,
            teacher_id,
            isAvailable
        })
    
        newSubject.save()

        return res.status(200).json({message: "Subject saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectsController.updateSubject = async (req, res) => {
    try {
        let {
            subjectName,
            teacher_id,
            isAvailable
        } = req.body

        const subjectUpdated = await subjectsModel.findByIdAndUpdate(req.params.id, {
            subjectName,
            teacher_id,
            isAvailable
        }, {new: true})

        if (!subjectUpdated) {
            return res.status(400).json({message: "Subject not found"})
        }

        return res.status(200).json({message: "Subject updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectsController.deteleSubject = async (req, res) => {
    try {
        const subjectDeleted = await subjectsModel.findByIdAndDelete(req.params.id)
        
        if (!subjectDeleted) {
            return res.status(400).json({message: "Subject not found"})
        }

        return res.status(200).json({message: "Subject deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default subjectsController
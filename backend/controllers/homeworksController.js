import homeworksModel from "../models/homeworks.js"

const homeworksController = {}

homeworksController.getHomeworks = async (req, res) => {
    try {
        const homeworks = await homeworksModel.find()
        return res.status(200).json(homeworks)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

homeworksController.insertHomework = async (req, res) => {
    try {
        let {
            title,
            description,
            dueDate,
            priority,
            status
        } = req.body

        const newHomework = new homeworksModel({
            title,
            description,
            dueDate,
            priority,
            status
        })
    
        newHomework.save()

        return res.status(200).json({message: "Subject saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

homeworksController.updateHomework = async (req, res) => {
    try {
        let {
            title,
            description,
            dueDate,
            priority,
            status
        } = req.body

        const homeworkUpdated = await homeworksModel.findByIdAndUpdate(req.params.id, {
            title,
            description,
            dueDate,
            priority,
            status
        }, {new: true})

        if (!homeworkUpdated) {
            return res.status(400).json({message: "Homework not found"})
        }

        return res.status(200).json({message: "Homework updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

homeworksController.deleteHomework = async (req, res) => {
    try {
        const homeworkDeleted = await homeworkstModel.findByIdAndDelete(req.params.id)
        
        if (!homeworktDeleted) {
            return res.status(400).json({message: "Homework not found"})
        }

        return res.status(200).json({message: "Homework deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default homeworksController
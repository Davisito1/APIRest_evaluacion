import subjectCategorysModel from "../models/subjectCategorys.js"

const subjectCategoryController = {}

subjectCategoryController.getCategorys = async (req, res) => {
    try {
        const categorys = await subjectCategorysModel.find()
        return res.status(200).json(categorys)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectCategoryController.insertCategory = async (req, res) => {
    try {
        let {
            categoryName,
            description,
            color,
            isActive
        } = req.body

        const newCategory = new subjectCategorysModel({
            categoryName,
            description,
            color,
            isActive
        })
    
        newCategory.save()

        return res.status(200).json({message: "Category saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectCategoryController.updateCategory = async (req, res) => {
    try {
        let {
            categoryName,
            description,
            color,
            isActive
        } = req.body

        const categoryUpdated = await subjectCategorysModel.findByIdAndUpdate(req.params.id, {
            categoryName,
            description,
            color,
            isActive
        }, {new: true})

        if (!subjectUpdated) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json({message: "Category updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

subjectCategoryController.deteleCategory = async (req, res) => {
    try {
        const categoryDeleted = await subjectCategorysModel.findByIdAndDelete(req.params.id)
        
        if (!subjectDeleted) {
            return res.status(400).json({message: "Category not found"})
        }

        return res.status(200).json({message: "Category deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default subjectCategoryController
const logoutStudentController = {}

logoutStudentController.logout = async (req, res) => {
    res.clearCookie("authCookie")
    return res.status(200).json({message: "Sign out"})
}

export default logoutStudentController
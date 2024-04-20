const userModel = require('../models/user')
exports.signupController = (req, res)=>{
    const data = {userFirstName: req.body.firstName, userMiddleName: req.body.middleName,  userEmail: req.body.email, userPassword: req.body.password}
    userModel.signupModel(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Success"})
        }
        else{
            throw error
        }
    })
}
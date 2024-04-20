const jobModel = require('../models/jobs')
exports.fetchJobCategoryController = (req, res)=>{
    jobModel.fetchCategory(req.con, (error, result)=>{
        if(result){
            console.log(result)
            res.json(result)
        }
        else{
            throw error
        }
    })
}
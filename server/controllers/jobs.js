const jobModel = require('../models/jobs')
//controller that fetches job category from db
exports.fetchJobCategoryController = (req, res)=>{
    jobModel.fetchCategory(req.con, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//controller that fetches job data by job title 
exports.fetchByJobTitleController = (req, res)=>{
    const data = {jobTitle: `%`+req.params.id+`%`}
    jobModel.fetchByJobTitle(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//controller that fetches all the job data
exports.fetchAllJobDataController = (req, res)=>{
    jobModel.fetchJobData(req.con, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//controller that creates a job record
exports.createJobRecordController = (req, res)=>{
    const data = {jobTitle: req.body.jobTitle, jobTitleOro: req.body.jobTitleOro, jobDescription: req.body.jobDescription, jobDescriptionOro: req.body.jobDescriptionOro, jobRequirement: req.body.jobRequirement, jobRequirementOro: req.body.jobRequirementOro, jobCategory: req.body.jobCategory, jobCategoryOro: req.body.jobCategoryOro, closingDate: req.body.closingDate, closingDateOro: req.body.closingDateOro, jobSalary: req.body.jobSalary, jobSalaryOro: req.body.jobSalaryOro, currency: req.body.currency, currencyOro: req.body.currencyOro, salaryInText: req.body.salaryInText, salaryInTextOro: req.body.salaryInTextOro, experience: req.body.experience, experienceOro: req.body.experienceOro, requiredNumber: req.body.requiredNumber, requiredNumberOro: req.body.requiredNumberOro, employmentType: req.body.employmentType, employmentTypeOro: req.body.employmentTypeOro, howToApply: req.body.howToApply, howToApplyOro: req.body.howToApplyOro, companyId: req.body.companyId, workPlace: req.body.workPlace, workPlaceOro: req.body.workPlaceOro}
    jobModel.createJobRecord(req.con, data, (error, result)=>{
        if(result){
            res.json({"message": "Record successfull created"})
        }
        else{
            throw error
        }
    })
}
//controllwr that fetches job info 
exports.fetchJobDataController = (req, res)=>{
    jobModel.fetchJobInfo(req.con, (error, result)=>{
        if(result){
            res.json(result)
        }
        else{
            throw error
        }
    })
}
//fetch job detail
exports.fetchJobDetailController = (req, res)=>{
    const data = {jobId: parseInt(req.params.id)}
    
    jobModel.fetchJobDetail(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
            
        }
        else{
            throw error
        }
    })
}
//browse jobs by category controller 
exports.fetchJobByCategoryController = (req, res)=>{
    const data = {jobCategory: req.params.id}
    
    jobModel.fetchJobByCategory(req.con, data, (error, result)=>{
        if(result){
            res.json(result)
            
        }
        else{
            throw error
        }
    })
}
//fetch location data to browse by location
exports.fetchLocationDataController = (req, res)=>{
    jobModel.fetchLocationData(req.con, (error, result)=>{
        if(result){
            res.json(result)
            
        }
        else{
            throw error
        }
    })
}
//job counter based on job category
exports.jobCounterController = (req, res)=>{
    jobModel.counterByCategory(req.con, (error, result)=>{
        if(result){
            res.json(result)
            
        }
        else{
            throw error
        }
    })
}

const companyModel = require('../models/company')
//create company req.body controller
exports.createCompanyData= (req, res)=>{
    const data = {companyName: req.body.companyName, password: req.body.password, companyAbout: req.body.companyAbout, companyNoOfEmp: req.body.companyNoOfEmp, email: req.body.email, website: req.body.website, companyType: req.body.companyType, location: req.body.location}
    companyModel.createCompany(req.con, data, (error, result)=>{
        if(result){
            res.json({message: "Success"})
        }
        else{
            throw error
        }
    })
}
const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
const cvBuilderController = require("../controllers/cvBuilder")
const userController = require("../controllers/user")
const upload = require("../controllers/imageUpload")
const logoUpload = require('../controllers/logoUpload')
const jobController =  require('../controllers/jobs')
const companyController = require('../controllers/company')
const contactController = require('../controllers/contact')
//login controllers
router.post('/auth', userController.loginController)
//user routes 
router.post('/create-signup-data', userController.signupController)
//CV builder education route handlers
router.get('/fetch-educational-data/:id', cvBuilderController.fetchEducationalData)
router.post('/create-education-data', cvBuilderController.createEducationData)
router.put('/update-education-data', cvBuilderController.updateEducationData)
router.post('/delete-education-data', cvBuilderController.deleteEducationData)
//CV builder experience route handlers
router.get('/fetch-experience-data/:id', cvBuilderController.fetchExperienceData)
router.post('/create-experience-data', cvBuilderController.createExperienceData)
router.put('/update-experience-data', cvBuilderController.updateExperienceData)
router.delete('/delete-experience-data', cvBuilderController.deleteExperienceData)
//CV builder language route handlers 
router.get('/fetch-language-data/:id', cvBuilderController.fetchLanguageData)
router.post('/create-language-data', cvBuilderController.createLanguageData)
router.put('/update-language-data', cvBuilderController.updateLanguageData)
router.delete('/delete-language-data', cvBuilderController.deleteLanguageData)
//CV builder skill route handlers 
router.get('/fetch-skill-data/:id', cvBuilderController.fetchSkillData)
router.post('/create-skill-data', cvBuilderController.createSkillData)
router.put('/update-skill-data', cvBuilderController.updateSkillData)
router.delete('/delete-skill-data', cvBuilderController.deleteSkillData)
//CV builder personal data route handlers 
router.get('/fetch-personal-data/:id', cvBuilderController.fetchPersonalDataController)
router.put('/update-personal-data', cvBuilderController.updatePersonalData)
//CV builder cv image changer
router.post('/upload-cv-image', upload.single('image'), cvBuilderController.uploadProfileImage)
router.get('/display-user-image/:id', cvBuilderController.displayCVImage)
//job routes
router.get('/fetch-jobs', jobController.fetchAllJobDataController)
router.get('/fetch-active-jobs', jobController.fetchActiveJobs)
router.get('/fetch-job-category', jobController.fetchJobCategoryController)
router.get('/fetch-by-title/:id', jobController.fetchByJobTitleController)
router.get('/fetch-job-data', jobController.fetchJobDataController)
router.get('/fetch-job-detail/:id', jobController.fetchJobDetailController)
router.post('/create-job-data', jobController.createJobRecordController)
router.get('/fetch-location-data', jobController.fetchLocationDataController)
router.get('/browse-by-category/:id', jobController.fetchJobByCategoryController)
router.get('/job-counter', jobController.jobCounterController)
router.get('/fetch-by-organization/:id', jobController.fetchByOrgTypeController)
router.get('/fetch-by-emp-type/:id', jobController.fetchByEmpTypeController)
router.get('/fetch-by-location/:id', jobController.fetchByLocationController)
router.get('/fetch-by-experience/:id', jobController.fetchByExperienceController)
//route to company pages
router.post('/create-company-data', companyController.createCompanyData)
router.post('/create-company-data-admin', logoUpload.single('image'), companyController.createCompanyDataAdmin)
router.post('/employers/auth', companyController.loginController)
router.get('/fetch-company-info/:id', companyController.fetchCompanyInfoController)
router.get('/company-home', companyController.loginCheckerController)
router.post('/upload-company-logo', logoUpload.single('image'), companyController.uploadCompanyLogoController)
router.get('/display-company-logo/:id', companyController.displayCompanyLogoController)
router.get('/fetch-company-names', companyController.fetchCompanyNameController)
router.get('/fetch-job-seekers', companyController.fetchJobSeekersController)
router.get('/view-job-seekers/:id', companyController.viewJobSeekersController)
//jobseekrs route 
router.get('/job-seekers-home', userController.loginCheckerController)
router.get('/logout', userController.logoutController)
//send feedback to the email
router.post('/send-feedback', contactController.sendFeedback)
//send mail
router.post('/send-email',userController.forgetPasswordController) 
module.exports = router;
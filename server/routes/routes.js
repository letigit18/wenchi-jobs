const express = require("express");
const router = express.Router();
const cvBuilderController = require("../controllers/cvBuilder")
//CV builder education route handlers
router.get('/fetch-educational-data', cvBuilderController.fetchEducationalData)
router.post('/create-education-data', cvBuilderController.createEducationData)
router.put('/update-education-data', cvBuilderController.updateEducationData)
router.post('/delete-education-data', cvBuilderController.deleteEducationData)
//CV builder experience route handlers
router.get('/fetch-experience-data', cvBuilderController.fetchExperienceData)
router.post('/create-experience-data', cvBuilderController.createExperienceData)
router.put('/update-experience-data', cvBuilderController.updateExperienceData)
router.delete('/delete-experience-data', cvBuilderController.deleteExperienceData)
//CV builder language route handlers 
router.get('/fetch-language-data', cvBuilderController.fetchLanguageData)
router.post('/create-language-data', cvBuilderController.createLanguageData)
router.put('/update-language-data', cvBuilderController.updateLanguageData)
router.delete('/delete-language-data', cvBuilderController.deleteLanguageData)
//CV builder skill route handlers 
router.get('/fetch-skill-data', cvBuilderController.fetchSkillData)
router.post('/create-language-data', cvBuilderController.createSkillData)
router.put('/update-language-data', cvBuilderController.updateSkillData)
router.delete('/delete-language-data', cvBuilderController.deleteSkillData)
module.exports = router;
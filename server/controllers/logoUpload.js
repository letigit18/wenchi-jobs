const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
            cb(null, 'public/logoImages')
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + " " + Date.now() + path.extname(file.originalname))
    }

 })
 const logoUpload = multer({
    storage: storage
 })
 module.exports = logoUpload;
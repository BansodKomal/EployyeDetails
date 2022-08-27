const express = require('express');
const router = express.Router();
const loginController = require('../controller/login')
const employeeController = require('../controller/employeController')
// const cloudinary = require('../controller/clodinaryController.js')
const upload = require('../controller/clodinaryController.js')




router.post("/loginUser", loginController.loginUser)
router.post("/create", upload.create)



module.exports = router;
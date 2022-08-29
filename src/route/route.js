const express = require('express');
const router = express.Router();
const loginController = require('../controller/login')
const employeeController = require('../controller/employeController')
// const cloudinary = require('../controller/clodinaryController.js')
const upload = require('../controller/clodinaryController.js')
const leaveController = require("../controller/leaveController")
const attendanceController = require("../controller/attendanceController")
const expenseController = require("../controller/expenseController")




router.post("/loginUser", loginController.loginUser)


////////////////////////////////////////////////////////////////////////////////
router.post("/create", employeeController.createEmploye)
router.get("/getEmployee", employeeController.getEmployeeById)
router.put("/updateEmploye", employeeController.updateEmployee)
router.delete("/delete/:employeId", employeeController.deleteEmpleById)

//////////////////////////////////////////////////////////////////////////////

router.post("/createLeave/:employeId", leaveController.createLeave)
router.get("/getLeave/:employeId", leaveController.getLeave)
router.put("/updateleave", leaveController.updateleave)
router.delete("/deleteLeaveIdById", leaveController.deleteLeaveById)


module.exports = router;
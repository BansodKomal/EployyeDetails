const express = require('express');
const router = express.Router();

const employeeController = require('../controller/employeController')
const leaveController = require("../controller/leaveController")
const attendanceController = require("../controller/attendanceController")
const expenseController = require("../controller/expenseController")
const userController = require("../controller/userController")
const middleware = require("../middleware/auth")
const until = require("../util/cloudnariy")

router.post("/userCreate",userController.userCreate )
router.post("/loginUser", userController.loginUser)


////////////////////////////////////////////////////////////////////////////////

router.post("/create", middleware.auth, employeeController.createEmploye)
router.get("/getEmployee"

,  middleware.auth,employeeController.getEmployeeById)
router.put("/updateEmploye", middleware.auth,employeeController.updateEmployee)
router.delete("/delete",middleware.auth, employeeController.deleteEmpleById)

//////////////////////////////////////////////////////////////////////////////

router.post("/createLeave/:employeId", middleware.auth,leaveController.createLeave)
router.get("/getLeave",middleware.auth, leaveController.getLeaveData)
router.put("/updateLeave",middleware.auth, leaveController.updateLeave)
router.delete("/deleteLeaveIdById", leaveController.deleteLeaveById)
 
/////////////////////////////////////////////
router.post("/createExpense", middleware.auth,expenseController.createExpense)
router.get("/getExpenseData", middleware.auth,expenseController.getExpenseData)
router.put("/updateExpenseData", middleware.auth,expenseController.updateExpenseData)
router.delete("/deleteExpense", middleware.auth,expenseController.delteExpenseData)

///////////////////////////////////////
router.post("/createAttendaceDetails",middleware.auth, attendanceController.createAttendaceDetails)
router.get("/getAttendance", middleware.auth,attendanceController.getAttendanceSheet)
router.put("/updateAttendance", middleware.auth,attendanceController.updateAttendance)
router.delete("/delteAttendanceId",middleware.auth, attendanceController.deleteAttendanceData)



////////////////////////////////////////////////////////
router.post("/uploadImage", until.upload)


module.exports = router;
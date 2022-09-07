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
router.get("/getEmployee",employeeController.getEmployeeById)
router.put("/updateEmploye", middleware.auth,employeeController.updateEmployee)
router.delete("/delete",middleware.auth, employeeController.deleteEmpleById)

//////////////////////////////////////////////////////////////////////////////

router.post("/createLeave", middleware.auth,leaveController.createLeave)
router.get("/getLeave",middleware.auth, leaveController.getLeaveData)
router.put("/updateLeave",middleware.auth, leaveController.updateLeave)
router.delete("/deleteLeaveIdById", leaveController.deleteLeaveById)
 
/////////////////////////////////////////////
router.post("/createExpense", middleware.auth,expenseController.createExpense)
router.get("/getExpenseData", middleware.auth,expenseController.getExpenseData)
router.put("/updateExpenseData", middleware.auth,expenseController.updateExpenseData)
router.delete("/deleteExpense", middleware.auth,expenseController.delteExpenseData)


////////////////////////////////////////////////////////
router.post("/uploadImage", until.upload)
router.post("/attendanceCrete", attendanceController.createDetails)
router.put("/update", attendanceController.updateAttendance)
router.get("/getAttendaceByDate", attendanceController.getAttendaceByDate)
router.delete("/deleteAttendanceById/:date", attendanceController.deleteAttendanceById)


module.exports = router;
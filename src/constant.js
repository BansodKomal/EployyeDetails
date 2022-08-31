module.exports =
{
  httpCodes: {
    "NEWLYCREATED": 201,
    "SUCCESS": true,
    "ERROR": false,
    "HTTP_SUCCESS": 200, // Success
    "HTTP_ACCEPTED": 202, // Accepted but not processed successfully
    "HTTP_BAD_REQUEST": 400, // Bad Request URI or Field missing or not valid
    "HTTP_FORBIDDEN": 403, // Unauthorized access or no premission
    "HTTP_NOT_FOUND": 404, // Not Found
    "HTTP_ALREADY_EXISTS": 409, // User already exist
    "HTTP_ALREADY_CANCELLED": 412, // Appointment alreayd cancelled
    "HTTP_SERVER_ERROR": 500, // Server Error
    "HTTP_OTP_REDIRECT": 405, // Redirect to OTP verification,
    "HTTP_NOT_EXISTS": 401, // Not exist
    "HTTP_PROFILE_REDIRECT": 408,
    "LOGOUT_USER": 413,
    "PENDING": 0,
    "ACTIVE": 1,
    "BLOCKED": 2,
    "DEACTIVE": 3,
    "USER_STATUS": {
      "ACTIVE": 1,
      "DEACTIVE": 0
    },

  },
  messages:
  {
    "LOGIN": {
      "SUCCESS": "Logged in successfully",
      "FAILURE": "Invalid Email/Username or Password",
      "NOT_VERIFIED": "Please verify your account",
      "BLOCKED": "Your account is not active yet. Please contact Admin for activation.",
      "NOT_FOUND": "Invalid username or password",
      "MATCH":"password dosnt match , enter same password"
    },
    "VALID":{
       "BODY": "enter some data",
       "FEILD":"email is require please enter email",
       "FEILD2":"password is require please enter password"
    },
    "SIGNUP": {
        "ALREADY_EXISTS": "Try something different, this email and password already exists",
        "EMAIL_ALREADY_EXISTS": "Try something different, this email already exists",
        "SUCCESS": "your account is successfully created",
        "PHONE_ALREADY_USE": "try something different phone number already in use",
        "EMAIL": "email is not empty, please enter email",
        "PASSWORD": "password is not empty, please enter password",
        "VALIDEMAIL": "please enter valid email",
        "VALIDBODY":"enter   some data",
        "VALIDPASSWORD": "please enter valid password,password should contain upperCase letter, lowercase letter,  charecter,and number ",
        "VALIDPHONE": "please enter valid phone number, enter 10 digit number"
      },
      "EMPLOYE":{
        "SUCCESS": "employee details successfully created",
        "GET":"get employee detatails sucessefully",
        "UPDATE": "employee details successfully updated",
        "PARAM":"this id is deleted or inccorect, please enter valid Id ",
        "ABCENTID":"id not present is db or it delete",
        "DELETE":"employee details is deleted successfully",
        "EMPTY":"body not empty please enter some data"

      },
      "LEAVE":{
        "SUCCESS": "leave application is submitted successfully",
        "UPDATE": "leave data successfully updated",
        "DELETE": "leave data is deleted successfully",
        "GETDATA": "get leave data successfully"

      },
      "ATTENDANCE":{
        "SUCCESS": "your attendance is recorded successfully",
        "UPDATE": "attendance data successfully  updated",
        "DELETE": "attendance data is deleted successfully",
        "GETDATA": "get attendance  data successfully",
        "DATE":"it is not correct date format for date , please enter in format 'DD/MM/YYYY'",
        "TIME":"it is not correct time format for time, please enter in format 'HH:mm'"

      },
      "EXPENSE":{
        "SUCCESS": "expense data is successfully created",
        "UPDATE": "expense data successfully  updated",
        "DELETE": "expense data  is deleted successfully",
        "GETDATA": "get expense data  successfully"

      },
      "AUTHENTICATE": {
        "AUTHORIZE": "user is authorise able to access data",
        "AUTHENTICATE": "user is authenticate successfully",
        "FAILER": "user not authorise",
        "TOKEN": "Missing authentication token in request",
        "INVALID": "token userId and blogUserID is not same , please enter valid userid",
        "invaild":"userId and token userId not same"
      },
}
}
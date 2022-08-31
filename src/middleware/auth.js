const constant = require("../constant.js")
const userModel = require('../model/userModel')
const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"];

        if (!token) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.TOKEN, data: null })

        }
        let decodedToken = jwt.verify(token, process.env.scretKey);
        let userId = decodedToken.userId
        if (!decodedToken) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID, data: null });
        }
  next()
    }
    catch (error) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: error.message })
    }
}


module.exports ={auth}


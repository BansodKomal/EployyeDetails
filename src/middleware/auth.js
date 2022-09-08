const constant = require("../constant.js")
const userModel = require('../model/userModel')
const jwt = require("jsonwebtoken");

const auth = async function (req, res, next) {
    try {
        const token = req.headers["authorization"]
        if (!token) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.TOKEN, data: null })
        }
        const bearer = token.split(' ')
        const bearerToken = bearer[1]
        const decodedToken = jwt.verify(bearerToken, process.env.scretKey);

        if (!decodedToken) {
            return res.status(constant.httpCodes.HTTP_FORBIDDEN).send({ status: false, message: constant.messages.AUTHENTICATE.INVALID, data: null });
        }

        let userId = await userModel.findOne({ _id: decodedToken.userId })
      
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ msg: err.message })
    }

}
module.exports = { auth }


const constant = require("../constant.js")
const userModel = require('../model/userModel')
const jwt = require("jsonwebtoken");


const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim.length === 0) return false
    return true

}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const userCreate = async function (req, res) {
    try {
        let userData = req.body
        const { name, email, phone, password } = userData
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDEMAIL, data: null })

        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPASSWORD, data: null })
        }
        if (!(/^([+]\d{2})?\d{10}$/.test(phone)))
        return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPHONE, data: null })
        let savedData = await userModel.create(userData)
        return res.status(constant.httpCodes.NEWLYCREATED).send({ status: true, message: constant.messages.SIGNUP.SUCCESS, data: savedData })

    }
    catch (err) {
        res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ status: false, message: err.message })
    }
}



const loginUser = async function (req, res) {

    try {

        let body = req.body
        const { email, password, } = body
        if (!isValidRequestBody(body)) {

            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.BODY, data: null })
        }

        if (!isValid(email)) {

            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD, data: null })
        }
        if (!isValid(password)) {

            return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.VALID.FEILD2, data: null })
        }
        if (Object.keys(body) != 0) {

            if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDEMAIL, data: null })
            }
            if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password))) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.SIGNUP.VALIDPASSWORD, data: null })
            }

            let user = await userModel.findOne({ email: email, password: password });
            if (!user) {
                return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.LOGIN.FAILURE, data: null });
            }



            let token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                }, process.env.scretKey

            );
            res.status(constant.httpCodes.HTTP_SUCCESS).setHeader("x-api-key", token);
            return res.status(constant.httpCodes.HTTP_SUCCESS).send({ status: true, message: constant.messages.LOGIN.SUCCESS, data: token });
        }

        else { return res.status(constant.httpCodes.HTTP_BAD_REQUEST).send({ status: false, message: constant.messages.LOGIN.NOT_FOUND }) }

    }
    catch (err) {

        return res.status(constant.httpCodes.HTTP_SERVER_ERROR).send({ messages: err.message })
    }
}



module.exports = { userCreate, loginUser }
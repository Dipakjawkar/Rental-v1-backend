const ErrorHandler = require("../utils/errorHandling")
const userModel = require('../model/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.signup = async (req, res, next) => {

    try {

        const { name, email, password, birthdate, gender, mobile } = req.body
        if (!name || !email || !password || !birthdate || !gender || !mobile) {
            return next(new ErrorHandler("Plese Fill Details", 400))
        }

        const isExist = await userModel.findOne({ "email": email })

        if (isExist) {
            return next(new ErrorHandler("User Exists !", 409))
        }

        const cpassword = await bcrypt.hash(password, 10)

        const user = new userModel({ name, email, "password": cpassword, birthdate, gender, mobile })
        await user.save();

        res.status(200).json({
            "success": true,
            "message": "user created Successfull !",
            user
        })

    } catch (e) {
        return next(new ErrorHandler(e))
    }

}
exports.signin = async (req, res, next) => { // Add 'next' to function parameters

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Invalid Details", 204)) // Respond with 204 and error message
        }

        const user = await userModel.findOne({ "email": email });

        if (!user) {
            return next(new ErrorHandler("User Not Found", 404)) // Respond with 404 and error message
        }


        if (await bcrypt.compare(password, user.password)) {


            const token = await jwt.sign( { "id":user._id }, process.env.JWT_KEY, { expiresIn: '1h' })

            const tokenUpdate = await userModel.findOneAndUpdate({"email": email},{ $set: {token} })

            if(!tokenUpdate){
                return next(new ErrorHandler("Token Error !", 401))
            }
            
            res.cookie('token', token, { httpOnly: true })
            return res.status(200).json({ success: true, message: "signin successful !", user, token});  // Respond with success message
            

        } else {
            return next(new ErrorHandler("Invalid Password", 401)) // Respond with 401 if password doesn't match
        }

    } catch (e) {
        return next(new ErrorHandler(e)); // Pass the error to the error handling middleware
    }
}
exports.signout = (req, res) => {
    res.send("ok")
}
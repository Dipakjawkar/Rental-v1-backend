const ErrorHandler = require("../utils/errorHandling")
const userModel = require('../model/userModel')
const bcrypt = require("bcrypt")

exports.signup = async (req, res, next) =>{

    try{

        const {name, email, password, birthdate, gender, mobile} = req.body
        if(!name || !email || !password || !birthdate || !gender || !mobile ){
            return next(new ErrorHandler("Plese Fill Details", 400))
        }
    
        const isExist = await userModel.findOne({"email": email})
    
        if(isExist){
            return next(new ErrorHandler("User Exists !", 409))
        }

        const cpassword = await bcrypt.hash(password, 10)
        
        const user = new userModel({name, email, "password":cpassword, birthdate, gender, mobile})
        await user.save();

        res.status(200).json({
            "success" : true,
            "message" :"user created Successfull !",
            user
        })

    }catch(e){
        return next(new ErrorHandler(e))
    }

}
exports.signin = (req,res) =>{
    res.send("ok")
}
exports.signout = (req,res) =>{
    res.send("ok")
}
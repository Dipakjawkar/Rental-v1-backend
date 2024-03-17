const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "plese enter name !"]
    },
    email:{
        type:String,
        required:[true, "plese enter email  !"]
    },
    password:{
        type:String,
        required:[true, "plese enter password  !"]
    },
    mobile:{
        type:Number,
        required:[true, "plese enter mobile  !"]
    },
    birthdate:{
        type:Date,
        required:[true, "plese enter mobile  !"]
    },
    gender:{
        type:String,
        required:[true, "plese enter gender "]
    },
    token:{
        type:String
    }
},{
    timestamps:{
        createdAt:"create-at",
        updatedAt:"update-at"
    }
})

module.exports = mongoose.model("user", userSchema)


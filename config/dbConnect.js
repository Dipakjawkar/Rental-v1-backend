const mongoose = require("mongoose");

const dbConnect = async () => {

    try {
        const conn = await mongoose.connect(process.env.DB_CONNNECT)
        conn ? console.log("DB CONNECT !") : console.log("DB error !")
    } catch (e) {
        console.log("database error !")
    }
}

dbConnect()
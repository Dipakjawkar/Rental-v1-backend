const express = require("express");
const errorMiddleware = require("./middleware/error.js")
require("dotenv").config();

require("./config/dbConnect")


const app = express();

app.use(express.json())

const PORT = process.env.PORT

app.use("/api/v1/user",require("./routes/userRoutes"))

app.listen(PORT, ()=>{
    console.log("SERVER IS STARTD !")
})


app.use(errorMiddleware)
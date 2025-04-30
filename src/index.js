const express = require("express")
const cors = require("cors")

const services = require("./services")
const userRouter = require("./routes/users")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)

app.listen(PORT, async () => {
    await services.init()
    global.appServices = services

    console.log("services initialized successfully")
    console.log(`server started running on PORT: ${PORT}`)
})
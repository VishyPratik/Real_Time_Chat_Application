require("dotenv").config();
const express = require("express");
const connectDb = require("./config/database")
const cookieParser = require("cookie-parser")

const cors = require("cors")

const router = require("./Routes/userRoute")
const getRouter = require("./Routes/getUserRoute")
const messageRouter=require("./Routes/messageRoute");
const { app, server } = require("./socket/socket");

app.use(cors({
    origin: "https://real-time-chat-application-fronted.onrender.com",
    credentials: true,

}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("hello baby kya hal h kya kar rhi ho")
})
/*cloudinary.api.ping()
    .then(() => {
        console.log("Cloudinary connected successfully");
    })
    .catch((error) => {
        console.log("Cloudinary connection failed:", error.message);
    });*/

app.use("/api", router);
app.use("/api/auth", getRouter);
app.use("/api/trans", messageRouter);
server.listen(port, () => {
    connectDb();
    console.log(`server is started at port ${port}....`)
})
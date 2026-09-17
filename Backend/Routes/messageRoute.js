const express = require("express");
const messageRouter = express.Router();
const {auth}=require("../middleware/auth")
const { sendMessage, getMessage }=require("../Controller/messageController")
messageRouter.post("/send/:receiver", auth, sendMessage);
messageRouter.get("/get/:receiver", auth , getMessage);



module.exports = messageRouter;
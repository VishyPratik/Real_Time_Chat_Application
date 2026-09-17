const express = require("express");
const getRouter = express.Router();

const { auth } = require("../middleware/auth");
const { currentUser, editProfile, getOtherUsers } = require("../Controller/getUser");


//const upload = require("../middleware/multer");

getRouter.get("/current", auth, currentUser);

getRouter.put(
    "/profile",
    auth,
    editProfile
);
getRouter.get("/others", auth, getOtherUsers);

module.exports = getRouter;
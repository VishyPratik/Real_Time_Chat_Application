const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();


// SignUp User


exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All data fullfilled"
            })
        }
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 character"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`
        })
        // console.log(user)
        return res.status(200).json({
            success: true,
            message: "User is  registerd successfully",
            user: user,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not registerd "
        })
    }
}

// Login User



exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please all data fullfilled"
            })
        }

        const user = await User.findOne({ email });
        //console.log(userExit);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user does not exits"
            })
        }


        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,

            }
            // console.log(payload);
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            // console.log(token);
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User is Logged In successfully",
                user: user,
                token: token,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "password  incorrcet"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not logged in"
        })
    }
}


// Logout User

exports.Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};





    
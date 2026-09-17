const User = require("../models/userModel")
const { uploadOnCloudinary } = require("../config/cloudinary")
exports.currentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user is not exits"
            })
        }
        return res.status(200).json({
            success: true,
            message: "find the current user",
            user: user,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "user is not exits"
        })
    }
}


//Edit Profile

exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        //console.log("BODY:", req.body);

        const { username } = req.body || {};
        const image = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(username)}`;

        console.log("USERNAME:", username);

        const user = await User.findByIdAndUpdate(
            userId,
            {
                username,image
            },
            {
                new: true
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.log("Edit Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Profile not updated"
        });
    }
};


// getUser


exports.getOtherUsers = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.find({ _id: { $ne: id } }).select("-password");
        // console.log(user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not logged in please sign in"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Users successfully",
            user:user,
        });
        

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "not found user"
        });
    }
 }
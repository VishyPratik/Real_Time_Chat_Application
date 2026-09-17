
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
    try {
        const sender = req.user.id;
        const { receiver } = req.params;
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            partcipants: { $all: [sender, receiver] }
        });

        const newMessage = await Message.create({
            sender,
            receiver,
            message
        });

        if (!conversation) {
            conversation = await Conversation.create({
                partcipants: [sender, receiver],
                messages: [newMessage._id]
            });
        } else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }

        const receiverSocketId = getReceiverSocketId(receiver);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(200).json({
            success: true,
            message: "Message created successfully",
            newMessage
        });

    } catch (error) {
        console.log("CREATE MESSAGE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getMessage = async (req, res) => {
    try {
        const  sender  = req.user.id;
        const { receiver } = req.params;
        const conversation = await Conversation.findOne({
            partcipants: { $all: [sender, receiver] }
        }).populate("messages")
        if (!conversation) {
            return res.status(400).json({
                success: false,
                message: "conversation not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "find the conversation ",
            conversation: conversation.messages,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "not get message"
        })
    }
}
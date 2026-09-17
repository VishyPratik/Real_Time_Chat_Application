import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import dp from "../assets/dp.svg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/UserSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from "axios"
import { serverUrl } from '../main';
import { setMessage } from '../redux/MessageSlice';
import { useEffect } from 'react';
function MessageArea() {
    const { selectedUser, userData, socket } = useSelector((state) => state.user);
    const { messages } = useSelector((state) => state.message)
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [message, setInput] = useState("");
    const emojiClick = (emojiData) => {
        setInput(prevInput => prevInput + emojiData.emoji);
        setShowPicker(false);
    }
    const handleForm = async (e) => {
        e.preventDefault();
        if (message.length == 0) {
            return;
        }
        try {
            const result = await axios.post(
                `${serverUrl}/api/trans/send/${selectedUser._id}`,
                { message: message },
                {
                    withCredentials: true,

                }
            );
            dispatch(setMessage([...messages, result.data.newMessage]));

            setInput("");
        }
        catch (error) {
            console.log(error.message);
            console.log("SERVER ERROR:", error.response?.data);
        }
    }

    useEffect(() => {
        socket.on("newMessage", (mess) => {
            dispatch(setMessage([...messages, mess]))
        })
        return () => socket.off("newMessage")
    }, [messages, setMessage])

    return (

        <div className="relative h-full w-full min-w-0 bg-slate-200 border-l border-gray-300 overflow-hidden flex flex-col">


            {selectedUser && (
                <div
                    className="
                shrink-0
                w-full
                h-[70px] md:h-[90px]
                bg-[#359dc0]
                rounded-b-3xl
                shadow-lg
                flex items-center
                gap-3 md:gap-5
                px-4 md:px-5
                z-20
            "
                >
                    <FaArrowLeftLong
                        className="text-[20px] md:text-[24px] cursor-pointer text-white shrink-0"
                        onClick={() => dispatch(setSelectedUser(null))}
                    />

                    <img
                        className="h-10 w-10 rounded-full shrink-0"
                        src={selectedUser?.image || dp}
                    />

                    <h1 className="text-white text-lg md:text-xl font-semibold truncate">
                        {selectedUser?.username || "user"}
                    </h1>
                </div>
            )}

            {selectedUser && (
                <div className="flex-1 min-h-0 relative">


                    <div
                        className="
                    absolute
                    inset-0
                    bottom-0
                    overflow-y-auto
                    overflow-x-hidden
                    px-3 md:px-6
                    pt-5
                    pb-24 md:pb-28
                    flex flex-col
                    gap-4 md:gap-6
                "
                    >


                        {showPicker && (
                            <div
                                className="
                            absolute
                            bottom-20
                            left-2 md:left-5
                            z-50
                            shadow-lg
                        "
                            >
                                <EmojiPicker
                                    height={350}
                                    width={window.innerWidth < 640 ? 280 : 350}
                                    onEmojiClick={emojiClick}
                                />
                            </div>
                        )}


                        <div
                            className="
    h-[calc(100vh-170px)]
    overflow-y-auto
    overflow-x-hidden
    px-3 md:px-6
    pt-5
    pb-5
    flex
    flex-col
    gap-4 md:gap-6
  "
                        >
                            {messages
                                .filter((mess) => {
                                    const senderId = mess.sender?._id || mess.sender;
                                    const receiverId = mess.receiver?._id || mess.receiver;

                                    const myId = userData?.user?._id;
                                    const selectedUserId = selectedUser?._id;

                                    return (
                                        (senderId === myId && receiverId === selectedUserId) ||
                                        (senderId === selectedUserId && receiverId === myId)
                                    );
                                })
                                .map((mess) => {
                                    const senderId = mess.sender?._id || mess.sender;
                                    const myId = userData?.user?._id;

                                    if (senderId === myId) {
                                        return (
                                            <SenderMessage
                                                key={mess._id}
                                                message={mess.message}
                                            />
                                        );
                                    }

                                    return (
                                        <ReceiverMessage
                                            key={mess._id}
                                            message={mess.message}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    <div
                        className="
                    absolute
                    bottom-3 md:bottom-5
                    left-0
                    right-0
                    flex
                    justify-center
                    px-3 md:px-5
                    z-40
                "
                    >
                        <form
                            className="
                        h-12 md:h-13
                        w-full
                        max-w-[750px]
                        bg-[#20c7ff]
                        flex items-center
                        rounded-full
                        shadow-lg
                    "
                            onSubmit={handleForm}
                        >


                            <div
                                className="w-12 md:w-16 flex justify-center cursor-pointer shrink-0"
                                onClick={() => setShowPicker(prev => !prev)}
                            >
                                <RiEmojiStickerLine
                                    className="text-[23px] md:text-[25px] text-white"
                                />
                            </div>


                            <input
                                type="text"
                                className="
                            h-full
                            min-w-0
                            flex-1
                            outline-none
                            text-[16px] md:text-[20px]
                            text-white
                            font-semibold
                            placeholder:text-white
                            placeholder:opacity-80
                            bg-transparent
                        "
                                placeholder="Message"
                                onChange={(e) => setInput(e.target.value)}
                                value={message}
                            />


                            {message.length > 0 && (
                                <button
                                    type="submit"
                                    className="px-4 md:px-5 shrink-0"
                                >
                                    <IoSend
                                        className="text-[22px] md:text-[25px] text-white cursor-pointer"
                                    />
                                </button>
                            )}
                        </form>
                    </div>

                </div>
            )}


            {!selectedUser && (
                <div className="flex-1 flex justify-center items-center flex-col px-4 text-center">

                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                        Welcome to Chatly
                    </h1>

                    <p className="text-lg md:text-2xl font-semibold text-gray-800 mt-2">
                        Chat Friendly!
                    </p>

                </div>
            )}

        </div>
    )
}

export default MessageArea

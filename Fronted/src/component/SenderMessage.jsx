import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import dp from "../assets/dp.svg"
function SenderMessage({ message }) {
    let scroll = useRef();
    const { userData, selectedUser } = useSelector((state) => state.user)
    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }, [message]);

    return (
        <div
            className="
    self-end
    w-fit
    
    max-w-[85%]
    sm:max-w-[70%]
    bg-[#20c7ff]
    rounded-2xl
    rounded-tr-none
    text-[15px]
    text-white
    
    p-2
    mr-2
    sm:mr-15
    break-words
    overflow-wrap-anywhere
  "
        >
            <div
                ref={scroll}
                className="text-[16px] sm:text-[20px] font-semibold break-words"
            >
                {message}
            </div>
        </div>
    );
}

export default SenderMessage;
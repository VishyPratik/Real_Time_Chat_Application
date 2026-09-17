import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
function ReceiverMessage({ message }) {
    let scroll = useRef();
    useEffect(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }, [message]);
    return (
        <div
            className="
    self-start
    w-fit
    max-w-[85%]
    sm:max-w-[70%]
    bg-[#20c7ff]
    rounded-2xl
    rounded-tl-none
    text-[15px]
    text-white
    p-2
    ml-2
    sm:ml-8
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

export default ReceiverMessage;
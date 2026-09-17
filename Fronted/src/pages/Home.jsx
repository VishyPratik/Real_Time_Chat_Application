import React from 'react'
import SideBar from '../component/SideBar'
import MessageArea from '../component/MessageArea'
import getMessage from '../customHook/GetMessage'
import { useDispatch, useSelector } from 'react-redux';
function Home() {
    getMessage();
    const { selectedUser, userData, socket } = useSelector((state) => state.user);
    return (
        <div className="h-screen w-full flex overflow-hidden">

            <div
                className={`
      h-full
      w-full
      lg:w-150
      shrink-0
      bg-slate-200
      overflow-hidden
      ${selectedUser ? "hidden" : "block"}
      lg:block
    `}
            >

                <SideBar />
            </div>


            <div
                className={`
      h-full
      min-w-0
      flex-1
      relative
      bg-slate-200
      border-l
      border-gray-300
      overflow-hidden
      ${selectedUser ? "block" : "hidden"}
      lg:block
    `}
            >

                <MessageArea />
            </div>

        </div>
    )
}

export default Home

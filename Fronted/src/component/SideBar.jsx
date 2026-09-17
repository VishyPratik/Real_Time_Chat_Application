import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../main';
import { useNavigate } from 'react-router';
import { setOtherUsers, setSelectedUser, setUserData } from '../redux/UserSlice';
function SideBar() {
    const { userData, otherUsers, onlineUsers, selectedUser } = useSelector((state) => state.user);
    const [search, setSearch] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/logout`,

                {
                    withCredentials: true
                })
            dispatch(setUserData(null));
            dispatch(setOtherUsers(null));
            navigate("/login");
        }
        catch (error) {
            console.log(error.message);
            setErr(error.response.data.message);
        }
    }
    return (
        <div className="h-full w-full bg-slate-200 overflow-hidden">

            <div
                className="h-10 w-10 rounded-full bg-[#20c7ff] flex justify-center items-center fixed bottom-8 ml-3 cursor-pointer"
                onClick={handleLogOut}
            >
                <BiLogOutCircle className="h-6 w-6" />
            </div>


            <div
                className="
      w-full
      h-[260px] md:h-[300px]
      bg-[#20c7ff]
      rounded-b-[15%] md:rounded-b-[30%]
      shadow-lg
      flex flex-col
      justify-center
      pl-4 md:pl-5
    "
            >

                <h1 className="text-[23px] font-bold text-white font-sans">
                    Chatly
                </h1>


                <div className="flex justify-between items-center pr-4 md:pr-8">

                    <h1 className="text-[17px] md:text-[20px] font-bold text-gray-800 font-sans">
                        Hii, {userData?.user?.username || "user"}
                    </h1>

                    <img
                        className="h-12 w-12 md:h-15 md:w-15 rounded-full shadow-lg shadow-gray-700 cursor-pointer"
                        src={userData?.user?.image}
                        onClick={() => navigate("/profile")}
                    />

                </div>


                <div className="mt-5 flex gap-3 items-center">

                    {!search && (
                        <div
                            className="h-10 w-10 shrink-0 rounded-full bg-white flex justify-center items-center cursor-pointer"
                            onClick={() => setSearch(true)}
                        >
                            <IoSearch className="h-6 w-6" />
                        </div>
                    )}

                    {search && (
                        <form
                            className="
            h-10
            w-[calc(100vw-32px)] md:w-90
            bg-white
            border border-gray-200
            rounded-3xl
            flex gap-3 items-center
            shadow-lg
          "
                        >
                            <IoSearch className="h-6 w-6 ml-2 shrink-0" />

                            <input
                                type="text"
                                placeholder="search users..."
                                className="outline-none text-[14px] md:text-[15px] font-semibold w-full"
                            />

                            <RxCross2
                                className="h-6 w-6 mr-3 cursor-pointer shrink-0"
                                onClick={() => setSearch(false)}
                            />
                        </form>
                    )}


                    {!search &&
                        otherUsers?.map((user) =>
                            onlineUsers?.includes(user._id) && (
                                <div
                                    key={user._id}
                                    className="relative shrink-0 cursor-pointer"
                                    onClick={() => dispatch(setSelectedUser(user))}
                                >
                                    <img
                                        className="h-10 w-10 rounded-full shadow-lg shadow-gray-700"
                                        src={user.image}
                                    />

                                    <div className="absolute bottom-0 right-0 bg-green-400 h-3 w-3 rounded-full border-2 border-white"></div>
                                </div>
                            )
                        )}

                </div>
            </div>


            <div className="overflow-y-auto h-[calc(100vh-260px)] md:h-[calc(100vh-300px)]">

                <div className="flex flex-col gap-4 ml-2 mt-6 mr-2">

                    {otherUsers?.map((user) => (
                        <div
                            key={user._id}
                            className="
            flex items-center
            gap-3
            h-12
            w-full
            md:w-93
            shadow-lg shadow-gray-600
            rounded-3xl
            
            hover:bg-blue-400
            cursor-pointer
          "
                            onClick={() => dispatch(setSelectedUser(user))}
                        >


                            <div className="relative shrink-0">

                                <img
                                    className="h-12 w-12 rounded-full shadow-lg shadow-gray-700"
                                    src={user.image}
                                />

                                {onlineUsers?.includes(user._id) && (
                                    <div className="absolute bottom-0 right-0 bg-green-400 h-3 w-3 rounded-full border-2 border-white"></div>
                                )}

                            </div>


                            <h1 className="text-[15px] md:text-[16px] font-semibold text-gray-800 truncate">
                                {user.username}
                            </h1>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}

export default SideBar

import React from 'react'
import axios from 'axios';
import { useRef, useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import dp from "../assets/dp.svg"
import { setUserData } from '../redux/UserSlice';
import { serverUrl } from '../main';
function Profile() {
    const { userData } = useSelector((state) => state.user);
    const [username, setUserName] = useState("");
    const [save, setSave] = useState(false);

    //const [frontImage, setFrontImage] = useState(userData.image || dp);
    // const [backImage, setBackImage] = useState(null);
    //let image = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /*const handleImage = (e) => {
        let file = e.target.files[0];
        // console.log(file);
        setBackImage(file);
        setFrontImage(URL.createObjectURL(file));
    }*/
    const submitForm = async (e) => {
        setSave(true);
        e.preventDefault();

        try {
            /*const formData = new FormData();

            formData.append("username", username);

            if (backImage) {
                formData.append("image", backImage);
            }*/

            //console.log(formData)

            const result = await axios.put(
                `${serverUrl}/api/auth/profile`,
                { username: username },
                {
                    withCredentials: true,

                }
            );

            // console.log(result.data);
            //console.log(result.data.user);
            dispatch(setUserData(result.data));
            navigate("/");
            setSave(false);

        } catch (error) {
            console.log("ERROR:", error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-200 flex flex-col gap-10 px-4 py-6">


            <div className="relative w-full">
                <Link to="/">
                    <FaArrowLeftLong className="text-2xl sm:text-3xl cursor-pointer mt-2 sm:ml-10" />
                </Link>
            </div>


            <div className="flex flex-col gap-6 justify-center items-center">


                <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full border-4 border-[#20c7ff] bg-white shadow-lg shadow-gray-400 cursor-pointer">

                    <img
                        src={userData?.user?.image}
                        className="h-full w-full rounded-full object-cover"
                    />


                    <IoCameraOutline className="absolute bottom-1 right-1 h-7 w-7 bg-white rounded-full p-1 cursor-pointer" />

                </div>


                <div className="w-full max-w-[500px]">

                    <form
                        className="flex flex-col items-center gap-5"
                        onSubmit={submitForm}
                    >


                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="h-10 outline-none w-full px-4 text-[16px] font-semibold border-2 border-[#20c7ff] rounded-lg shadow-lg text-black"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />

                        <input
                            type="text"
                            readOnly
                            className="h-10 w-full outline-none border-2 px-4 text-[16px] font-semibold border-[#20c7ff] rounded-lg shadow-lg text-gray-400"
                            value={userData?.user?.username || ""}
                        />


                        <input
                            type="email"
                            readOnly
                            className="h-10 w-full outline-none border-2 px-4 text-[16px] font-semibold border-[#20c7ff] rounded-lg shadow-lg text-gray-400"
                            value={userData?.user?.email || ""}
                        />


                        <button
                            type="submit"
                            className="mt-5 h-10 w-38 text-[19px] font-semibold text-gray-700 bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg cursor-pointer hover:shadow-inner"
                        >
                            {!save ? "Save profile" : "Saving..."}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Profile

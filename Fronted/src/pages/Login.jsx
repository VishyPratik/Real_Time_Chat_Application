
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import { serverUrl } from '../main';
import { setSelectedUser, setUserData } from '../redux/UserSlice';
function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post(`${serverUrl}/api/login`, {
                email, password
            }, {
                withCredentials: true
            })
            console.log(result);
            dispatch(setUserData(result.data));
            dispatch(setSelectedUser(null));
            navigate("/");
            setEmail("");
            setPassword("");
            setErr("");
        }
        catch (error) {
            console.log(error.message);
            setErr(error.response.data.message);

        }
    }
    return (
        <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center px-4 py-6">

            <div className="w-full max-w-[500px] min-h-[500px] bg-white rounded-lg shadow-lg flex flex-col gap-6 overflow-hidden">


                <div className="w-full h-[180px] sm:h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-lg flex justify-center items-center px-4">

                    <h1 className="text-[25px] sm:text-[30px] font-bold text-gray-600 text-center">
                        Login to <span className="text-white">Chatly</span>
                    </h1>

                </div>


                <div className="px-5 sm:px-8 pb-6">

                    <form
                        className="flex flex-col items-center gap-5"
                        onSubmit={handleLogin}
                    >

                        <input
                            type="email"
                            placeholder="email"
                            className="h-10 outline-none w-full border-2 px-4 text-[16px] font-semibold border-[#20c7ff] rounded-lg shadow-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <div className="relative w-full">

                            <input
                                type={show ? "text" : "password"}
                                placeholder="password"
                                className="outline-none h-10 w-full border-2 pl-4 pr-12 text-[16px] font-semibold border-[#20c7ff] rounded-lg shadow-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <span
                                onClick={() => setShow((prev) => !prev)}
                                className="absolute right-4 top-2 cursor-pointer text-gray-600"
                            >
                                {show ? <FiEye /> : <FiEyeOff />}
                            </span>

                        </div>


                        {err && (
                            <p className="text-base sm:text-xl font-semibold text-red-500 text-center">
                                {err}*
                            </p>
                        )}


                        <button
                            type="submit"
                            className="mt-5 h-10 w-30 text-[19px] font-semibold text-gray-700 bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg cursor-pointer hover:shadow-inner"
                        >
                            Login
                        </button>


                        <Link to="/signup" className="text-center">
                            <p className="text-gray-800 font-semibold cursor-pointer text-sm sm:text-base">
                                Want to create a new Account?
                                <span className="text-[#20c7ff]"> Sign Up</span>
                            </p>
                        </Link>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Login

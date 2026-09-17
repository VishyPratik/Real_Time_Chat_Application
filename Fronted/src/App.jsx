import { Navigate, Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import getCurrentUser from "./customHook/GetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import getOtherUsers from "./customHook/GetOtherUsers";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { serverUrl } from "./main";
import { setOnlineUsers, setSocket } from "./redux/UserSlice";

function App() {
    getCurrentUser();
    getOtherUsers();
    const { userData, socket, onlineUsers } = useSelector((state) => state.user);
    const dispatch=useDispatch()
    useEffect(() => {
        if (userData) {
            const socketio = io(`${serverUrl}`, {
                query: {
                    userId: userData?.user?._id,
                }
            })
            dispatch(setSocket(socketio))
            socketio.on("getOnlineUsers", (users) => {
                dispatch(setOnlineUsers(users))
            })

            return () => socketio.close()
        }
        else {
            if (socket) {
                socket.close()
                diapatch(setSocket(null))
            }
        }
        
    },[userData])
    

    return (
        <Routes>
            <Route path="/login" element={!userData ? (<Login />) : (<Navigate to="/" />)} />
            <Route path="/signup" element={!userData ? (<SignUp />) : (<Navigate to="/profile" />)} />
            <Route path="/" element={userData?(<Home />):(<Navigate to="/login" />)} />
            <Route path="/profile" element={userData ? (<Profile />) : (<Navigate to="/signup" />)} />
        </Routes>
    )
}

export default App;
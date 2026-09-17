import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/UserSlice";

const getCurrentUser = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/auth/current`, { withCredentials: true })
                dispatch(setUserData(result.data));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [])
}

export default getCurrentUser;
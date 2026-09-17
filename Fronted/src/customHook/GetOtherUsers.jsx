import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setOtherUsers, setUserData } from "../redux/UserSlice";

const getOtherUsers = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/auth/others`, { withCredentials: true })
                dispatch(setOtherUsers(result.data.user));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [dispatch])
}

export default getOtherUsers;
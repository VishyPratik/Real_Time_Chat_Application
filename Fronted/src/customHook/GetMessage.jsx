import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessage } from "../redux/MessageSlice";

const GetMessage = () => {
    const dispatch = useDispatch();

    const { selectedUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchMessage = async () => {
            if (!selectedUser?._id) return;

            try {
                const result = await axios.get(
                    `${serverUrl}/api/trans/get/${selectedUser._id}`,
                    {
                        withCredentials: true,
                    }
                );

               /* console.log(
                    "MESSAGE DATA:",
                    result.data.conversation
                );*/

                dispatch(setMessage(result.data.conversation));

            } catch (error) {
                console.log(
                    "GET MESSAGE ERROR:",
                    error.response?.data || error.message
                );
            }
        };

        fetchMessage();
    }, [selectedUser?._id, dispatch]);
};

export default GetMessage;
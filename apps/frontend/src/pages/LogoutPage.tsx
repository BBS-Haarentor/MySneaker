import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../features/slice/user/userSlice";
import {toast} from "react-toastify";
import {useEffect} from "react";

const LogoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(logout());

    toast.success("Erfolgreich Abgemeldet")

    useEffect(() => {
        navigate('/');
    })

    return (<></>)
}

export default LogoutPage;
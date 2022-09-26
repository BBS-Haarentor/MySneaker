import Cookies from 'js-cookie';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
    Cookies.remove("session")
    const navigate = useNavigate()

    useEffect(() => {
        navigate("/")
    })

    return (
        <>
        </>
    )
}

export default Logout

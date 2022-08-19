import Cookies from 'js-cookie';

const tutorial = () => {
    Cookies.remove("session")

    window.location.href = "/"

    return (
        <>
        </>
    )
}

export default tutorial

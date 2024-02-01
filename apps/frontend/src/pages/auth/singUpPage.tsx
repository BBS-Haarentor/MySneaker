import BasicInput from "../../components/input/BasicInput";
import BasicButton from "../../components/button/BasicButton";
import {Link} from "react-router-dom";
import {FormEvent} from "react";
import {useSignUp} from "../../hooks/api/user/useSignUp";
import {toast} from "react-toastify";

const SignUpPage = () => {
    const signUp = useSignUp()

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        const passwordRepeat = formData.get('password_repeat');

        if (typeof username === 'string' && typeof password === 'string' && typeof passwordRepeat === 'string') {
            if(passwordRepeat !== password) {
                toast.error('Passwörter stimmen nicht überein')
                return;
            }
            signUp({
                username,
                password
            });
        }
    }

    return (
        <>
            <div className="flex flex-col max-w-[500px] justify-center items-center h-full mx-auto">
                <h1 className="font-bold text-3xl">Registrieren</h1>
                <form className="my-5 flex flex-col w-full" onSubmit={onSubmit}>
                    <BasicInput name={"username"} label={"Benutzername"} type={"text"}/>
                    <BasicInput name={"password"} label={"Passwort"} type={"password"}/>
                    <BasicInput name={"password_repeat"} label={"Passwort wiederholen"} type={"password"}/>
                    <BasicButton text={"Registrieren"}/>
                </form>
                <Link className={"hover:text-indigo-300 duration-300 transition-all"} to={"/signin"}>Du hast bereits einen Account?</Link>
            </div>
        </>
    );
}

export default SignUpPage;
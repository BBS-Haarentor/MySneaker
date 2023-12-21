import BasicInput from "../../components/input/BasicInput";
import BasicButton from "../../components/button/BasicButton";
import { FormEvent } from 'react';
import { useSignIn } from '../../hooks/api/user/useSignIn';

const SignInPage = () => {

    const signIn = useSignIn()

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        if (typeof username === 'string' && typeof password === 'string') {
            signIn({
                username,
                password
            });
        }
    }
    return (
        <>
            <div className="flex flex-col max-w-[500px] justify-center items-center h-full mx-auto">
                <h1 className="font-bold text-3xl">Anmelden</h1>
                <form className="my-5 flex flex-col w-full" onSubmit={onSubmit}>
                    <BasicInput label={"Benutzername"} type={"text"} name={"username"}/>
                    <BasicInput label={"Passwort"} type={"password"} name={"password"}/>
                    <BasicButton text={"Anmelden"} type={"submit"}/>
                </form>
            </div>
        </>
    );
}

export default SignInPage;
import BasicInput from "../../components/input/BasicInput";
import BasicButton from "../../components/button/BasicButton";

const SignInPage = () => {
    return (
        <>
            <div className="flex flex-col max-w-[500px] justify-center items-center h-full mx-auto">
                <h1 className="font-bold text-3xl">Anmelden</h1>
                <form className="my-5 flex flex-col w-full">
                    <BasicInput label={"Benutzername"} type={"text"}/>
                    <BasicInput label={"Passwort"} type={"password"}/>
                    <BasicButton text={"Anmelden"} onClick={() => {}}/>
                </form>
            </div>
        </>
    );
}

export default SignInPage;
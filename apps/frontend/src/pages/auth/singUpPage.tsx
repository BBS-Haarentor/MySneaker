import BasicInput from "../../components/input/BasicInput";
import BasicButton from "../../components/button/BasicButton";

const SignUpPage = () => {
    return (
        <>
            <div className="flex flex-col max-w-[500px] justify-center items-center h-full mx-auto">
                <h1 className="font-bold text-3xl">Registrieren</h1>
                <form className="my-5 flex flex-col w-full">
                    <BasicInput label={"Benutzername"} type={"text"}/>
                    <BasicInput label={"Passwort"} type={"password"}/>
                    <BasicInput label={"Passwort wiederholen"} type={"password"}/>
                    <BasicButton text={"Registrieren"} onClick={() => {}}/>
                </form>
            </div>
        </>
    );
}

export default SignUpPage;
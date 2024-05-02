import { FormEvent, useContext } from "react";
import { LoginContext, LoginContextType } from "../../context/context";
import { useNavigate } from "react-router-dom";

const SignIn = (): JSX.Element => {


    const contextPointer = useContext<LoginContextType>(LoginContext);
    const navigate = useNavigate();
    
    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        contextPointer.login({ id: 1, name: "Arun", role: "developer" });
        navigate("/add");
    }
    console.log(contextPointer.user.id);
    return (
        <>
            <form onSubmit={handleLogin} className="">
                <p>Please enter your credentials to Login</p>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" required={false}></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" required={false}></input>
                <button type="submit">Login</button>
            </form>
        </>
    );
}


export default SignIn;
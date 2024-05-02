import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext, LoginContextType, UserType } from "../../context/context";


const Menu = () : JSX.Element => {
// logeed in- display the mname
// not logged in - ask to login

const contextPointer = useContext<LoginContextType>(LoginContext);

const userDetails: UserType = contextPointer.user;

console.log(userDetails.id);

    return (
        <ul className="nav">
            <li><Link to = "/find"> Find a transaction</Link></li>
            <li><Link to = "/add"> New transaction</Link></li>
            <li>{(userDetails.id===0)? <Link to ="/signin">Login</Link>:<Link to ="/">{userDetails.name}</Link>} </li>
        </ul>
    );
}

export default Menu;

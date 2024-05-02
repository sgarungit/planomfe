import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PageHeader from "./components/pageHeader/PageHeader";
import Search from "./components/Search/Search";
import NewTransactions from './components/Transactions/NewTransactions';
import Transactions from "./components/Transactions/Transactions";
import { useState } from 'react';
import { LoginContext, LoginContextType, UserType } from './context/context';
import SignIn from './components/SignIn/SignIn';

function App() {

    const[user, setUser] = useState<UserType>({id:0, name:"",role:"" });

    console.log(user);

    const login = (userinfo:UserType) =>{
        setUser(userinfo);
    };

    const logout = () =>{
        setUser({id:0,name:"",role:""});
    };

    const statefulContext:LoginContextType = {
        user:user,
        login:login,
        logout:logout
    };

    return (
        <LoginContext.Provider value={statefulContext}>
            <BrowserRouter>
                <PageHeader />
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/find" element  ={
                            <><Search /><Transactions /></> } />
                        <Route path="/add" element ={<NewTransactions/>}/>
                        <Route path ="/" element = {<a>Payments Applicaiton</a>}/>
                        <Route path ="*" element = {<a>Under Constructions</a>}/>
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;

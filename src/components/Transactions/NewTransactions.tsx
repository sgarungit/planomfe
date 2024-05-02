import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from "react";
import { PaymentType, addPaymentTransaction } from "../data/DataFunctions";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const NewTransactions = (): JSX.Element => {

    const [country, setCountry] = useState<string>("");

    // console.log(new Date().getDate(),  new Date().getDay);



    const reducerFunction = (state: PaymentType, data: { field: string, value: any }) => {
        return { ...state, [data.field]: data.value };

    }

    const initialNewTransactionState: PaymentType = {
        id: 11233,
        orderId: "",
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        country: "USA",
        currency: "USD",
        taxCode: 0,
        taxRate: 0.21,
        type: "SALE",
    };
    
    const [newTransaction, dispatch] = useReducer(reducerFunction, initialNewTransactionState);


        const handleReset =()=>{
           // dispatch({ field: , value: e.target.value });
        }

const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // addPaymentTransaction

        const addTransactionPromise : Promise<AxiosResponse<PaymentType>> = addPaymentTransaction(newTransaction);
        addTransactionPromise
            .then ( result => {
                if (result.status === 200) {
                    console.log("Add Transactions Successful ", result.data);
                    const country = result.data.country;
                    navigate("/find?country="+country);
                }
                else {
                   console.log("something went wrong " + result.status)
                }
            }).catch ( error => {
                console.log("something bad happened " + error);
            })
    }

    const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ field: e.target.id, value: e.target.value });
    }


    const checkValue = () => {

        const countryelem = document.getElementById("country") as HTMLInputElement;
        console.log(countryelem.value);
    }

    const orderIdRef = useRef<HTMLInputElement| null> (null);

    useEffect(()=>{
        orderIdRef.current?.focus();
    })

    return (<><form className="addNewTransaction" onSubmit={handleSubmit} onReset={handleReset} >
        <label htmlFor="orderId">Order ID</label>
        <input id="orderId" type="text" ref={orderIdRef} onChange={handleChange} value={newTransaction.orderId}></input>
        <br></br>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" onChange={handleChange} value={newTransaction.date}></input>
        <br></br>
        <label htmlFor="country">Country</label>
        <input id="country" type="text" onChange={handleChange} value={newTransaction.country}></input>
        <br></br>
        <label htmlFor="currency">Currency</label>
        <input id="currency" type="text" onChange={handleChange} value={newTransaction.currency}></input>
        <br></br>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" onChange={handleChange} value={newTransaction.amount}></input>
        <br></br>
        <label htmlFor="taxCode">Tax Code</label>
        <input id="taxCode" type="text" onChange={handleChange} value={newTransaction.taxCode}></input>
        <br></br>
        <label htmlFor="taxRate">tax rate</label>
        <input id="taxRate" type="number" onChange={handleChange} value={newTransaction.taxRate}></input>
        <br></br>
        <label htmlFor="type">Type</label>
        <input id="type" type="text" onChange={handleChange} value={newTransaction.type}></input>
        <br></br>
        <button type="submit">Save</button>
        <button type="reset">Clear</button>
    </form></>);

}

export default NewTransactions;
/*
 This is initially created for potential password-based authentication
 However, this is not the proper way to perform the authentication tasks as the password information may be intercepted easily.
*/ 

import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Register({email, setEmail, emaillst, Regstatus, setReg} : {email : string, setEmail:any, emaillst:string[], Regstatus: boolean, setReg : any}){
    const [emailID, setID] = useState<number>(0);
    function findEmailId(email,arr){
        arr.forEach( (ele : any) => {
            if(ele.address === email){
                setID(ele.id);
                console.log(ele.id);
            }}
        )
    }
    

    interface sent {
        username : string,
        passwd : string,
        email_id : number
    }
    type Registered = "Account Created" | "Error" | "Not Created";

    
    const [username, setUsername] = useState<string>("");
    const [passwd, setPasswd] = useState<string>("");
    const [status, setStatus] = useState<Registered>("Not Created");

    const register = (obj_sent : sent) => {
        fetch("https://demo-iu1g.onrender.com/users/", {
            mode: "no-cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(obj_sent)
        }).then( (response : any) => {
            setStatus("Account Created");
            setPasswd("");
            setUsername("");
            setEmail("");
            setReg(false);
            return response;
        }
        ).then( (data) => {
            console.log(data);

        }
        ).catch(
            err => {
                console.log(err);
                setStatus("Error");
            }
        );
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(emailID === 0){
            findEmailId(email, emaillst)}
        else{
            register({username: username, passwd: passwd, email_id: emailID});
            
        }
    }
    

    return (
    <div className="container">
        <br /><br />
        {Regstatus && <div>
            <h3>Register for a new account</h3><br /><br />
            <form onSubmit={handleSubmit}>
                <label className="form-label">Username: </label> 
                <input value={username} onChange={(e : any) => {setUsername(e.target.value);}} ></input>
                <br />
                <label className="form-label">Password: </label> 
                <input type="password"  
                value={passwd}
                onChange={e => {
                    setPasswd(e.target.value);
                }}
                />
                <br />
            <input type="submit" name="submit" />
            
            </form>
        </div>} 
        <pre><h4>{status}</h4></pre>
        <br />
        <Link to="/login">Back to Login page</Link>
        
    </div>
    )
}
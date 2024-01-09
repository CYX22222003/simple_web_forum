import React from "react";
import { useState } from "react";
import Register from "./Register.tsx";
export default function SignUp(){
    const [maillst, setMaillst] = useState<any>([]);
    const [submitinfo, setInfo] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);

    const address : string = "http://127.0.0.1:4000/emails/";
    interface email {
        address: string
    }
    const getemail = (address : string) => {
        fetch(address)
        .then(response => {
          return response.json()
        }).then(data => {
          console.log("data from backend: ",data);
          setMaillst(data);
          console.log(data.length);
        }
        ).catch(
          err => {
            console.log("errors occur.");
            console.log("details of errors: ", err);
          }
        );}

    const postmail = (obj_sent : email) =>{
        fetch(address, {
            mode: "no-cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(obj_sent)
        }).then( (response : any) => {
            return response;
        }
        ).catch(
            err => {
                console.log(err);
            }
        );  
    }

    const handleSubmithelper = (obj_sent : email) => {
        getemail(address);
        const tempxs = maillst.map((ele : any) => ele.address);
        if(tempxs.includes(obj_sent.address)){
            alert("Account has been created");
            setInfo("");
        }else{
            postmail(obj_sent);
            setStatus(true);
        }
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        handleSubmithelper({address: submitinfo}); 
    }

    return(
        <div>
            <br />
            <h3>Register for an account</h3> <br />
        <div className='container-lg bg-light text-center align-items-center'>
            
            <br />
            {/* <button onClick={() => {
                getemail(address);
                
            }}>Display Email List</button><br />
            {maillst.map((ele:any) => {
                return (<div>{ele.address}<br /></div>);
            })} */}
            <br />
            <form onSubmit={handleSubmit}>
                <label className="form-label">Email: </label>
                <input type="email" name="Email" value={submitinfo} onChange={(e : any) => {
                    setStatus(false);
                    setInfo(e.target.value);
                    getemail(address);
                }}/>
                <br />
                <input name="submit" type="submit" />
            </form>
            {<Register email={submitinfo} setEmail={setInfo} emaillst={maillst} Regstatus={status} setReg={setStatus}/> }
        </div>
        </div>
    )
}
/*
  purpose of this componets:
  1. Receive email id, display status as parameter. 
  2. email id is used to show all the comments related to the articles
  3. display status is used to indicate whether the comments is loaded and whether the content should be displayed
*/ 
import React, { useEffect } from "react";
import { useState } from "react";
import { TimeStringFormat } from "../Profile.tsx";
function FindUsername({emailid}:{emailid:any}){
  const [username, setUserName] = useState<any>(null);
  useEffect( () => {
  fetch("https://demo-iu1g.onrender.com/emails/" + String(emailid))
  .then((response:any) => {
    return response.json();
  }).then((data:any) => {
    console.log(data)
    setUserName(data.address);
  });}, []);
  console.log(username);
  return (<p>{username}</p>);
}

export default function Comment({id, isHide, setIsHide} : {id : number, isHide:boolean, setIsHide : any}){
    interface comment {
        updated_at : any,
        content: string,
        article_id: number,
        id: number,
        email_id: number
    }
    
    const address:string = 'https://demo-iu1g.onrender.com/comments/';
    const [objlst, setLst] = useState<Array<comment>>([]);
    
    
    const gettest = (id) => {fetch(address)
    .then(response => {
      return response.json();
    }).then(data => {
      console.log("data from backend: ",data);
      const test : Array<comment> = data.filter(ele => ele.article_id === id);
      setLst(test);
    }
    ).catch(
      err => {
        console.log("errors occur.");
        console.log(err);
      }
    );}

    const handleHide = () => {
      setIsHide(true);
      setLst([]);
    };
    const handleShow = () => {
      if(isHide){
        setIsHide(false);
        gettest(id);
      }else{
        gettest(id);
      }
    }

    

    useEffect(()=>{handleShow();},[]);
    return (
      <div className='container-lg bg-light text-center align-items-center'>
        <div>
          <button className='btn bg-secondary text-white align-item-center' onClick={handleShow}>Show Comment</button>
          <span className="tab">          </span>
          <button className='btn bg-warning text-white align-item-center' onClick={handleHide}>Hide Comment</button>
        </div>
        <br />
        <table className="table table-striped bg-light table-hover width:100%" >
          <thead>
            <td><h2 className="bg-light fst-italic">Comment</h2></td>
          </thead>
          <tbody>
          {objlst.map((ele) => {
            return (
            <tr key={ele.email_id}>
             
              <td>
              <div className="container-lg">
                <FindUsername emailid = {ele.email_id} />
                <textarea className="form-control"
                  rows={5}
                  value={ele.content}
                  readOnly/>
                <pre>{TimeStringFormat(ele.updated_at)}</pre>
              </div>
              </td>

            </tr>);
          })}
          </tbody>
        </table>
      </div>
    )
  }
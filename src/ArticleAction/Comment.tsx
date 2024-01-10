/*
  purpose of this componets:
  1. Receive email id, display status as parameter. 
  2. email id is used to show all the comments related to the articles
  3. display status is used to indicate whether the comments is loaded and whether the content should be displayed
*/ 
import React, { useEffect } from "react";
import { useState } from "react";

function FindUsername({emailid}:{emailid:any}){
  const [username, setUserName] = useState<any>(null);
  useEffect( () => {
  fetch("http://127.0.0.1:4000/emails/" + String(emailid))
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
    
    const address:string = 'http://127.0.0.1:4000/comments/';
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
        <button className='btn bg-success text-white align-item-center' onClick={handleShow}>Show Comment</button>
        
        <button className='btn bg-dark text-white align-item-center' onClick={handleHide}>Hide Comment</button>
        <br />
        <table className="table table-striped bg-light table-hover">
          <thead>
            <td>Username</td>
            <td>Comment</td>
          </thead>
          <tbody>
          {objlst.map((ele) => {
            return (
            <tr key={ele.email_id}>
              <td>
                <div className="container-sm">
                  <FindUsername emailid = {ele.email_id} />
                  {ele.updated_at}
                </div><br />
              </td>
              <textarea className="form-control"
                rows={5}
                value={ele.content}
                readOnly/>
            </tr>);
          })}
          </tbody>
        </table>
      </div>
    )
  }
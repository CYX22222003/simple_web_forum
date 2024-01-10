import React from 'react';
import { useState, useContext } from 'react';
import Comment from './Comment.tsx';
import { useParams } from 'react-router-dom';
import CreateComment from "./CreateComment.tsx"
import { AuthenContext } from '../App.tsx';
export default function ShowArticle(){
  const [article, setArticle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(true);
  const [article_id, setID] = useState<number>(0);
  
  const {userID} = useParams();
  const {AuthoState, setState, email_id, setEmailId} = useContext(AuthenContext);
  const address : string = "http://127.0.0.1:4000/articles/";
  // const deltest = (address : string) => {
  //   fetch(address, {
  //     method: "DELETE",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'X-Content-Type-Options' : 'nosniff'
  //     }
  //   }).then(
  //     (response) => {
  //       //console.log(request)
  //       console.log(response);
  //       console.log("message sent");
  //     }
  //   ).catch(
  //     () => {
  //       console.log("Error");
  //     })
  // }

  const gettest = (address : string) => {
    fetch(address)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log("data from backend: ",data);
      setArticle(data.body);
      setTitle(data.title);
      setID(data.id);
    }
    ).catch(
      err => {
        console.log("errors occur.");
        console.log("details of errors: ", err);
      }
    );}

  gettest(address+userID);
  return (
    <div className='container-lg bg-light text-center align-items-center'>
      <br />
      <h2>{title}</h2>
      <br />
      <textarea 
        className="form-control"
        rows={10}
        value={article}
        readOnly
      />
      {/* <button className='btn bg-danger align-item-center'
        onClick={()=>{gettest(address+userID);}}
      >
        GET
      </button>  */}
      
      {/* <button className='btn bg-warning align-item-center'
        onClick={() => {deltest(address+userID);setArticle("");}}
      >
        DELETE
      </button>  */}<br /> <br />
      <CreateComment article_id={article_id} email_id = {email_id}/>
      <br /><br />
      <Comment id = {Number(userID)} isHide = {isHide} setIsHide={setIsHide}/>
    </div>
  )
}
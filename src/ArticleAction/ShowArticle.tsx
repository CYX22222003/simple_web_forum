import React from 'react';
import { useState } from 'react';
import Comment from './Comment.tsx';
import { useParams } from 'react-router-dom';

export default function ShowArticle(){
  const [article, setArticle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(false);
  const [id, setID] = useState<string>("");

  const {userID} = useParams();
  const address : string = "http://127.0.0.1:4000/articles/";
  const deltest = (address : string) => {
    fetch(address, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options' : 'nosniff'
      }
    }).then(
      (response) => {
        //console.log(request)
        console.log(response);
        console.log("message sent");
      }
    ).catch(
      () => {
        console.log("Error");
      })
  }

  const gettest = (address : string) => {
    fetch(address)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log("data from backend: ",data);
      setArticle(data.body);
      setTitle(data.title);
    }
    ).catch(
      err => {
        console.log("errors occur.");
        console.log("details of errors: ", err);
      }
    );}


  return (
    <div className='container-lg bg-light text-center align-items-center'>
    <label className="form-label">article ID:</label>
      <input className="form-control" value={id} onChange={e => {
        setID(e.target.value);
        }} />
      <button className='btn bg-danger align-item-center'
        onClick={()=>{gettest(address+userID);}}
      >
        GET
      </button> 
      
      <button className='btn bg-warning align-item-center'
        onClick={() => {deltest(address+userID);setID("");setArticle("");}}
      >
        DELETE
      </button> 
      

      <br />
      <p>{title}</p>
      <br />
      <pre>{article}</pre> <br /><br />


      <Comment id = {Number(userID)} isHide = {isHide} setIsHide={setIsHide}/>
    </div>
  )
}
import React from 'react';
import { useState } from 'react';
import Comment from './Comment.tsx';

function App() {
  const [article, setArticle] = useState<string>("");
  const [id, setID] = useState<string>("");
  const address : string = "http://127.0.0.1:4000/articles/";
  
  const gettest = (address) => {
    fetch(address)
    .then(response => {
      return response.json()
    }).then(data => {
      console.log("data from backend: ",data);
      setArticle(data.body);
    }
    ).catch(
      err => {
        console.log("errors occur.");
        console.log("details of errors: ", err);
      }
    );}

  const obj_sent = {title: "12" , body: "12345"};

  const posttest = () => {
    console.log(obj_sent);
    fetch("http://127.0.0.1:4000/articles/", {
      mode: "no-cors",
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(obj_sent)
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

  const deltest = (address) => {
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

  const puttest = () => {
    console.log(obj_sent);
    fetch("http://127.0.0.1:4000/articles/1", {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({title: "new title", body: "new body"})
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

  return (
    <div className='container-lg bg-light text-center align-items-center'>
      <br />
      <p>This is to test the http requests sent to the backend</p>
      <button className="btn bg-primary align-item-center" 
        onClick={posttest}
      >
        POST
      </button> 

      <br /><br />

      <button className='btn bg-info align-item-center'
        onClick={puttest}
      >
        PUT
      </button><br /><br />
      
      <label>article ID:</label>
      <input value={id} onChange={e => {
        setID(e.target.value);
        }} />
      <button className='btn bg-danger align-item-center'
        onClick={()=>{gettest(address+id);}}
      >
        GET
      </button> 
      
      <button className='btn bg-warning align-item-center'
        onClick={() => {deltest(address+id);setID("");setArticle("");}}
      >
        DELETE
      </button> 
      

      <br /><br />
      <p>{article}</p> <br /><br />


      <Comment id = {Number(id)} />
    </div>
  );
}

export default App;

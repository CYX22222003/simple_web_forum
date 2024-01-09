/*
    1. useContext to pass the email id to the Article creation element
    2. The email id passed into the element will be used as a reference for posting new articles
*/

import React from 'react';
import { useState } from 'react';

export default function CreateArticle(){
    interface sent {
        title : string,
        body : string,
        email_id : number
    };

    const [article, setArticle] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [obj_sent, setObj] = useState<sent>({"title":"","body":"",email_id: 0});
    const [id, setID] = useState<string>("");
    const address : string = "http://127.0.0.1:4000/articles/";

    const posttest = (obj_sent : sent) => {
        console.log(obj_sent);
        fetch(address, {
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

    const puttest = (obj_sent : sent, address : string) => {
        console.log(obj_sent);
        fetch(address, {
        method: "PUT",
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

    return (
        <div className='container-lg bg-light text-center align-items-center'>
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={(e) => {setTitle(e.target.value); setObj({"title" : title, "body" : article, email_id:2});}} /><br /><br />
            <label className="form-label">Article</label>
            <textarea className="form-control" value={article} onChange={e => {setArticle(e.target.value); setObj({"title" : title, "body" : article, email_id:2});}}/><br />
            <button className='btn bg-danger align-item-center' onClick={() => {
                posttest(obj_sent);
            }}>
                Create New
            </button> 
            <br />
            <input className="form-control" value={id} onChange={(e) => {
                setID(e.target.value);
            }}/>
            <button className='btn bg-warning align-item-center' onClick={() => puttest(obj_sent, address + id)}>Update</button>
        </div>
    )

}
/*
    1. useContext to pass the email id to the Article creation element
    2. email_id is the unique id that is related to the accounts of users
    3. The email id passed into the element will be used as a reference for posting new articles
*/

import React, { useContext } from 'react';
import { useState, useEffect} from 'react';
import { AuthenContext } from '../App.tsx';

export default function CreateArticle(){
    interface sent {
        title : string,
        body : string,
        email_id : number
    };

    const {AuthoState, setState,email_id, setEmailId} = useContext(AuthenContext);
    const [article, setArticle] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [obj_sent, setObj] = useState<sent>({"title":"","body":"",email_id: 0});
    const [id, setID] = useState<string>("");
    const address : string = "https://demo-iu1g.onrender.com/articles/";

    const posttest = (obj_sent : sent) => {
        //setObj({"title" : title, "body" : article + " end", email_id:email_id});
        console.log(obj_sent);
        alert("ready to sent?");
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
            alert("message sent");
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
            alert("message sent");
        }
        ).catch(
        () => {
            console.log("Error");
        })
    }

    return (
        <div className='container-lg bg-light text-center align-items-center'>
        <form onSubmit={(e:any) => {
            e.preventDefault();
            
            const {title, article} = e.target;
            const obj_sent = {"title" : title.value, "body":article.value, email_id: email_id};
            posttest(obj_sent);
        }}>
            <label className="form-label">Title</label>
            <input className="form-control" id= "title" value={title} onChange={(e) => {setTitle(e.target.value); setObj({"title" : title, "body" : article, email_id:email_id});}} /><br /><br />
            <label className="form-label">Article</label>
            <textarea className="form-control" id = "article" value={article} onChange={e => {setArticle(e.target.value); setObj({"title" : title, "body" : article, email_id:email_id});}}/><br />
            <button className='btn bg-danger align-item-center' type='submit'>
                Create New
            </button> 
            <br />
        </form>
            {/* <input className="form-control" value={id} onChange={(e) => {
                setID(e.target.value);
            }}/>
            <button className='btn bg-warning align-item-center' onClick={() => puttest(obj_sent, address + id)}>Update</button> */}
        </div>
    )

}
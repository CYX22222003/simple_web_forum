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
        email_id : number,
        tag_id : number
    };

    const {AuthoState, setState,email_id, setEmailId} = useContext(AuthenContext);
    const [article, setArticle] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [obj_sent, setObj] = useState<sent>({"title":"","body":"",email_id: 0, tag_id:1});
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

    const [tag_id, setTagID] = useState<number>(1);


    return (
        <div className='container-lg bg-light text-center align-items-center'>
        <br></br>
        <h1>Creat New Posts</h1>
        <hr />
        <form onSubmit={(e:any) => {
            e.preventDefault();
            
            const {title, article} = e.target;
            const obj_sent = {"title" : title.value, "body":article.value, email_id: email_id, tag_id:tag_id};
            posttest(obj_sent);
        }}>
            <p><strong>Type </strong><span className='tab'> </span>
            <select value={tag_id} onChange={(e:any) =>{setTagID(e.target.value);} }>
                <option value={1}>article</option>
                <option value={2}>diary</option>
                <option value={3}>issue</option>
                <option value={4}>others</option>
            </select>
            </p>
            <br />
            <label className="form-label"><strong>Title</strong></label>
            <input className="form-control" id= "title" value={title} onChange={(e) => {setTitle(e.target.value); setObj({"title" : title, "body" : article, email_id:email_id, tag_id: tag_id});}} /><br /><br />
            <label className="form-label"><strong>Article</strong></label>
            <textarea className="form-control" id = "article" rows={10} value={article} onChange={e => {setArticle(e.target.value); setObj({"title" : title, "body" : article, email_id:email_id, tag_id: tag_id});}}/><br />
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
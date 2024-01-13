/*
    This is similar to the EditArticle element.
*/ 

import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenContext } from "../App.tsx";

export default function EditComment(){
    const {commentID} = useParams();
    
    const {AuthoState, setState, email_id, setEmailId} = useContext(AuthenContext);
    const [content, setContent] = useState<string>("");
    const [article_id, setArticleID] = useState<number>(0);

    useEffect(() => {
        fetch("http://127.0.0.1:4000/comments/" + commentID)
        .then((response:any) =>{
            return response.json()
        }).then((data:any) => {
            setContent(data.content);
            setArticleID(data.article_id);
            console.log(data);
        });
    },[])

    const puttest = (obj_sent : any, address : string) => {
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
        <div>
        <p>Comment id: {commentID}</p>
        <form onSubmit={(e:any) => {
            e.preventDefault();
            const {content} = e.target;
            const obj_sent = {"content" : content.value, article_id:article_id, email_id: email_id};
            puttest(obj_sent,"http://127.0.0.1:4000/comments/" + commentID);
        }}>
            <label className="form-label">Comment</label>
            <textarea className="form-control" id = "content" value={content} 
                rows={7}
                onChange={e => {setContent(e.target.value);}}/><br />
            <button className='btn bg-danger align-item-center' type='submit'>
                Create New
            </button> 
            <br />
        </form>
        </div>
    )
}
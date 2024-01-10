/*
    THIS IS A SUBCOMPONETs of ShowArticle
    1. enables users to upload his own comments to the article
    2. takes the email id of the registered users and 
*/ 
import React from "react";
import { useState, useContext } from "react";
export default function CreateComment({article_id, email_id} : {article_id : number, email_id : number}){
    type comment_sent = {
        article_id:number,
        email_id:number,
        content:string
    } | null;
    const [submitInfo, setInfo] = useState<comment_sent>(null);
    const [submitContent, setContent] = useState<string>("")

    function handleSubmit(submitInfo){
        const address:string = "http://127.0.0.1:4000/comments/";
        
        fetch(address, {
            mode: "no-cors",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(submitInfo)
            }).then((response) => {
                //console.log(request)
                console.log(response);
                alert("message sent");}
            ).catch((err) => {
                console.log("Error:", err);
            });
    }
    //use form to submit your comment or there will be some delay in the content.
    return (
        <div>
            <form onSubmit={(e:any) => {
                e.preventDefault();
                const {content} = e.target;
                handleSubmit({article_id:article_id, email_id: email_id, content: content.value});
            }}>
            <textarea className="form-control" id="content" rows={7} placeholder="Enter your comment here" value={submitContent} 
                onChange={ (e:any) =>{
                    setContent(e.target.value);
                    setInfo({article_id:article_id, email_id: email_id, content: submitContent});
                }}
            />
            <br />
            <button className="btn bg-danger text-white" type="submit">Create Comment</button>
            </form>
        </div>
    )
}
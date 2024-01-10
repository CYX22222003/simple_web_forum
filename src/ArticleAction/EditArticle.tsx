import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenContext } from "../App.tsx";

export default function EditArticle(){
    const {articleID} = useParams();
    //for checking only: console.log(articleID);
    const {AuthoState, setState, email_id, setEmailId} = useContext(AuthenContext);

    const [article, setArticle] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        fetch("http://127.0.0.1:4000/articles/" + articleID)
        .then((response:any) =>{
            return response.json()
        }).then((data:any) => {
            setArticle(data.body);
            setTitle(data.title);
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
        <p>Article id: {articleID}</p>
        <form onSubmit={(e:any) => {
            e.preventDefault();
            
            const {title, article} = e.target;
            const obj_sent = {"title" : title.value, "body":article.value, email_id: email_id};
            puttest(obj_sent,"http://127.0.0.1:4000/articles/" + articleID);
        }}>
            <label className="form-label">Title</label>
            <input className="form-control" id= "title" value={title} 
                onChange={(e) => {setTitle(e.target.value);}} /><br /><br />
            <label className="form-label">Article</label>
            <textarea className="form-control" id = "article" value={article} 
                rows={10}
                onChange={e => {setArticle(e.target.value);}}/><br />
            <button className='btn bg-danger align-item-center' type='submit'>
                Create New
            </button> 
            <br />
        </form>
        </div>
    )
}
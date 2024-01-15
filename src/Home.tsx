/*
    1. Display all the articles 
    2. Provide links to show all the article
*/ 
import React from "react";
import SearchBar from "./SearchBar.tsx";
import { useState, useEffect } from "react";

export default function Home(){
    

    const [articlelst,setArticleLs] = useState<any>([]);
    const [titlelst, setTitleLst] = useState<string[]>([]);
    const address : string = "https://demo-iu1g.onrender.com/articles/";

    useEffect(()=>
    {fetch(address)
    .then((response:any) => {
        return response.json();
    }).then((data:any) => {
        console.log(data);
        setArticleLs(data);
        setTitleLst(data.map((ele:any) => {return ele.title;}));
        console.log("article lists:", data);
    }).catch(
        err =>{console.log(err);}
    );},[]);

    
    return (
        <div>
            <div className="container mt-4">
            <h2>Article List</h2>
            <SearchBar articlelst={articlelst} setArticleLs={setArticleLs}/>
            <div className="table-responsive" style={{ maxHeight: '700px', overflowY: 'scroll' }}>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Article</th>
                    </tr>
                </thead>
                <tbody>
                {articlelst.map((item:any) => {
                return (
                    <tr>
                    <td><a href={"#show/" + String(item.id)} className="list-group-item list-group-item-action" key={item.id}>{item.title} </a></td>
                    <td>{item.body.substring(0,10)+"..."}</td>
                    <td><a href={"#show/" + String(item.id)}>full text</a></td>
                    </tr>);
                })
                }
                </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}
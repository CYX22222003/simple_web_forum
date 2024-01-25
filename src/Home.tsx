/*
    1. Display all the articles 
    2. Provide links to show all the article
*/ 
import React from "react";
import SearchBar from "./SearchBar.tsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home(){
    

    const [articlelst,setArticleLs] = useState<any>([]);
    const [titlelst, setTitleLst] = useState<string[]>([]);
    const address : string = "https://demo-iu1g.onrender.com/articles/";

    useEffect(()=>
    {fetch(address)
    .then((response:any) => {
        return response.json();
    }).then((data:any) => {
        
        setArticleLs(data);
        setTitleLst(data.map((ele:any) => {return ele.title;}));
       
    }).catch(
        err =>{console.log(err);}
    );},[]);

    
    return (
        <div>
            <div className="container-lg">
            <br />
            <h1>Home</h1>
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
                    <td><Link to={"/show/" + String(item.id)} className="text-danger" key={item.id}>
                        <button className="btn">{item.title}</button> </Link>
                        </td>
                    <td>{item.body.substring(0,25)+"..."}</td>
                    <td><Link className="text-white" to={"/show/" + String(item.id)}><button className="btn text bg-success">full text</button></Link></td>
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
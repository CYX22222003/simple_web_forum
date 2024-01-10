/*
    1. Create a profile page containing personal information of user.
    2. Create a portion that shows a lists of articles and comments created by users.
    3. Enable them to delete and edit comments and articles CREATED by them.
    4. Use useContext to display correct message to the user
*/
import React, { useState, useEffect, useContext } from "react"
import { AuthenContext } from "./App.tsx";
import { Link } from "react-router-dom";
export default function Profile(){
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
    const [commentLs, setCommentLs] = useState<any>([]);
    const [articleLs, setArticleLs] = useState<any>([]);
    const {AuthoState, setState, email_id, setEmailId} = useContext(AuthenContext);
    useEffect(()=>{
        const address:string = "http://127.0.0.1:4000/emails/articles/" + String(email_id);
        fetch(address)
        .then((response:any) => {
            return response.json();
        }).then((data:any) => {
            setArticleLs(data.articles);
        });
    },[]);
    
    useEffect(()=>{
        const address:string = "http://127.0.0.1:4000/emails/comments/" + String(email_id);
        fetch(address)
        .then((response:any) => {
            return response.json();
        }).then((data:any) => {
            setCommentLs(data.comments);
        });
    },[]);

    return (
        <div className="container-lg bg-light text-center align-items-center">
        <h1>Profile page</h1><br />
        <div>
            <h3>My Articles</h3><br /><br />
            <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
            <table className="table table-striped">
                <thead>
                    <td>title</td>
                    <td>body</td>
                    <td>time</td>
                </thead>
                <tbody>
                {articleLs.map((ele:any) => {
                    return (
                        <tr>
                            <td>{ele.title}</td>
                            <td>{ele.body.substring(0,10) + "..."}</td>
                            <td>{ele.updated_at}</td>
                            <td><Link to={"http:/localhost:3000/edit_article/" + String(ele.id)}>Edit</Link></td>
                            
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
        </div>
        <br /><br />
        <div>
            <h3>My Comments</h3><br /><br />
            <div className="table-responsive" style={{ maxHeight: '700px', overflowY: 'scroll' }}>
            <table className="table table-striped">
                <thead>
                    <td>content</td>
                    <td>time</td>
                    <td>Show full details</td>
                </thead>
                <tbody>
                {commentLs.map((ele:any) => {
                    return (
                        <tr>
                            <td><textarea 
                                className="form-control"
                                rows={7}
                                value={ele.content}
                                readOnly
                                />
                            </td>
                            <td>{ele.updated_at}</td>
                            <td><Link to={"/show/" + ele.article_id} >Link to the article</Link></td>
                            <td>
                            <button
                                    onClick={() => {
                                        const temp_id = ele.id;
                                        deltest("http://127.0.0.1:4000/comments/" + String(ele.id));
                                        setCommentLs(commentLs.filter(ele => ele.id !== temp_id))
                                    }}
                                >delete
                            </button><br /><br />
                            <Link to={"http:/localhost:3000/edit_comment/" + String(ele.id)}>
                                edit
                            </Link>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        </div>
    </div>
    );
    
}
import React from "react";
import { useState } from "react";
export default function Comment({id} : {id : number}){
    interface comment {
        updated_at : any,
        content: string,
        article_id: number,
        id: number
    }
    
    const [address, setAddress] = useState<string>("");
    const [objlst, setLst] = useState<Array<comment>>([]);
    const GetComment = (id:number) => {
      setAddress('http://127.0.0.1:4000/comments/')
      fetch(address)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log("data from backend: ",data);
        const test : Array<comment> = data.filter(ele => ele.article_id === id);
        setLst(test);
      }
      ).catch(
        err => {
          console.log("errors occur.");
        }
      );
      
    }
    return (
      <div className='container-lg bg-light text-center align-items-center'>
        <button className='btn bg-dark text-white align-item-center' onClick={
          () => {
            GetComment(id);
          }}>
          Show Comment
        </button>
        <button className='btn bg-info text-white align-item-center' onClick={() => {setLst([]);}}>Hide Comment</button>
        <br />
        <table className="table table-striped bg-light table-hover">
          <thead>
            <td>time</td>
            <td>comment</td>
            <td>Article id</td>
            <td>Comment id</td>
          </thead>
          <tbody>
          {objlst.map((ele) => {
            return (
            <tr>
              <td>{ele.updated_at}</td>
              <td>{ele.content}</td>
              <td>{ele.article_id}</td>
              <td>{ele.id}</td>
            </tr>);
          })}
          </tbody>
        </table>
      </div>
    )
  }
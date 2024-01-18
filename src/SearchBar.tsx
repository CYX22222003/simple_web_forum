import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({articlelst, setArticleLs} : {articlelst:any, setArticleLs: any}){
    const [itemLst, setItemLst] = useState<any>([]);
  
    const filterBySearch = (event:any) => {
        setItemLst([]);
        const query : string = event.target.value;
        
        query !== "" 
        ? setItemLst(articlelst.filter((item) => 
        (item.title).toLowerCase().indexOf(query.toLowerCase()) !== -1))
        : setItemLst([]); 
    };

    const fileterByTag = (event : any) => {
        
        const query : number = Number(event.target.value);
        
        query > 0 && query < 5
        ? setItemLst(articlelst.filter((item:any) => item.tag_id === query))
        : setItemLst([]);
    }

    return (<div>
    <div className="sidebar">
      <form className="mb-3">
        <div className="input-group">
            <input className="search-box pr-2" id="search-box" placeholder="Search By Name..." onChange={filterBySearch} />
            <span className="tab">  </span>
            <select onChange={fileterByTag}>
                <option value={0}>---Search By Type---</option>
                <option value={1}>article</option>
                <option value={2}>diary</option>
                <option value={3}>issue</option>
                <option value={4}>others</option>
            </select>
        </div><hr></hr>
        <div className="col">
            <ul className="nav nav-tabs">
            {itemLst.map((item) => (
            <li className="nav-item text-start list-group-item list-group-item-action">
                <Link to={"/show/" + String(item.id)} className="text-dark">{item.title}</Link>
                </li>
            ))}
            </ul>
            
        </div>
      </form>
      <br />
    </div>
    
  </div>);
}

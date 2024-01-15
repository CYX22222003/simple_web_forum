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
    return (<div>
    <div className="sidebar">
      <form className="mb-3">
        <div className="input-group">
            <input className="search-box" id="search-box" placeholder="Search..." onChange={filterBySearch} />
        </div>
        <div className="col-md-2">
       
            <ul >
            {itemLst.map((item) => (
            <li className="text-left item-left"><Link to={"/show/" + String(item.id)}>{item.title}</Link></li>
            ))}
            </ul>
            
        </div>
      </form>
    </div>
    
  </div>);
}

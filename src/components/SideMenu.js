import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import ".SideMenu.css";

function SideMenu() {
const [isOpen, setOpen] = useState(true);
  return isOpen ? (

    <div className="sidebar">
      <button className="closebtn" onclick={setOpen(!!isOpen)}>
      &times;
      </ button>
      {routes
        .filter(r => r.isNav)
        .map((r, i) => (
          <Link 
           to={r.path} 
            key={i} 
            className="nav"
            element={<r.element />}
          >
            {r.title}
          </Link>
        ))
      }
    </div>

  ) : (

    <div id="main">
      <button className="openbtn" onclick={setOpen(!!isOpen)}/>
      &#9776;
    </div>
    
  );
}

export default SideMenu;
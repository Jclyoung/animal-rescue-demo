import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, logout } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import routes from "../routes";
import "./Header.css";

function Header() {

  const [user] = useAuthState(auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if(user){
      return setIsLoggedIn(true);
    } else {
      return setIsLoggedIn(false);
    }
  },[user]);
    //     if (loading) return;
    //     if (!user) return navigate("/");
    
    //     fetchUserName();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [user, loading]);



  return (
    <>
    {console.log(isLoggedIn, "this is the user")}
      <div className='header'>
        <Link className='logo' to='/'>
          <img src='new-site-icon.png' alt='horse dog cat' className='logo' />
        </Link>
        <div className='header-right'>
          {routes
            .filter((r) => r.isUser === isLoggedIn && r.isNav )
            .map((r) => (
              <Link className='routes' key={r.title} to={r.path}>
                {r.title}
              </Link>
            ))} 
            {user && <Link className='routes' key='logout' to='/' onClick={logout}> Logout </Link>}
        </div>
      </div>
    </>
  );
}
export default Header;
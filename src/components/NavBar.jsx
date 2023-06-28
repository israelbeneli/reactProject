import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
export function NavBar(){
    const {user,logout} = useAuth();
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
      if (isDark) {
        document.getElementsByTagName("body")[0].setAttribute("data-bs-theme","light");
        localStorage.setItem("mode",false);
      } else {
        document.getElementsByTagName("body")[0].setAttribute("data-bs-theme","dark");
        localStorage.setItem("mode",true);
      }
    }, [isDark]); 
 return(
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
            <Link className="navbar-brand" to="/">
            B.Card<i className="bi bi-geo-fill"></i>App
            </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <NavLink className="nav-link" to="/"><li>Home</li></NavLink>
            <NavLink className="nav-link" to="/about"><li>About</li></NavLink>
            {user?.biz && <NavLink className="nav-link" to="/my-cards"><li>My-cards</li></NavLink>}
        </ul>

        <div className="col-md-3 text-end">
            {user?(<NavLink className="btn btn-primary mx-2" to="/logout">Logout</NavLink>):(<NavLink className="btn btn-primary mx-2" to="/Sing-in">Login</NavLink>)}
            
            <NavLink className="btn btn-primary mx-2" to="/Sing-up">Sign-up</NavLink>
        </div>
        <div className="col-md-3 text-end">
            <button className="btn border mx-2" onClick={()=>setIsDark(!isDark)}>{!isDark?<i className="bi bi-brightness-high"></i>:<i className="bi bi-moon"></i>}</button>
            {user && <i className="bi bi-person mx-2"></i>}
        </div> 
        </header>
    ) 
}
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export function LogOut(){
     const navigate = useNavigate(); 
    const { logout, user } = useAuth();
    if (user){
        logout();
        navigate("/");
    }
}
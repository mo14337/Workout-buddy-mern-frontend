import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export const useAuthContext=()=>{
    const context =useContext(authContext)
    return context
}
import {useAuthContext} from "../hooks/authHook";
import { useState } from "react";
import { routePrefix } from "../helper/helper";

export const Uselogin=()=>{
    const [error,setError]=useState(null)
    const [loading,setLoadng]=useState(null)
    const {dispatch}=useAuthContext();

    const login=async(email,password)=>{
        setLoadng(true)
        setError(null)

        const response = await fetch(`${routePrefix}/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          })

        const json =await response.json()

        if(!response.ok){
            setLoadng(false)
            setError(json.error)
        }

        if (response.ok) {
            //save the user to localstorage
            localStorage.setItem("user",JSON.stringify(json))
            dispatch({type:"LOGIN",payload:json})
            setLoadng(false)

            
        }

    }

    return {login,loading,error}

}
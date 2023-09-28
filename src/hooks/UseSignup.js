import { routePrefix } from "../helper/helper";
import {useAuthContext} from "../hooks/authHook";
import { useState } from "react";

export const useSignUP=()=>{
    const [error,setError]=useState(null)
    const [loading,setLoadng]=useState(null)
    const {dispatch}=useAuthContext();

    const signUp=async(email,password)=>{
        setLoadng(true)
        setError(null)

        const response = await fetch(`${routePrefix}/api/user/signup`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
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

    return {signUp,loading,error}

}
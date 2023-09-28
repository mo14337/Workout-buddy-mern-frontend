import React, { useState } from 'react'
import { useSignUP } from '../hooks/UseSignup'

function Signup() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const {signUp,error,loading}=useSignUP();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        await signUp(email,password)

    }

  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>Email</label>
        <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button disabled={loading}>Sign Up</button>
        {error && <div className='error'>{error}</div>}
        
    </form>
  )
}

export default Signup
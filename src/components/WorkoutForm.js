import React, { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/authHook'
import { routePrefix } from '../helper/helper'

function WorkoutForm() {
    const [title,setTitle]=useState("")
    const [load,setLoad]=useState("")
    const [reps,setReps]=useState("")
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    const {dispatch}=useWorkoutContext();
    const {user}=useAuthContext()


    async function handleSubmit(e){
        e.preventDefault()
        if(!user){
            setError("User Must Be Logged In")
            return
        }

        const workout={title,reps,load}

        const response=await fetch(`${routePrefix}/api/workouts`,{
            method:"POST",
            body:JSON.stringify(workout),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFileds)

        }
        if(response.ok){
            dispatch({type:"CREATE_WORKOUT",payload:json})
            setEmptyFields([])
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)

        }
        
    }

  return (


   
    <form className='create' onSubmit={handleSubmit}>
    <h3>Add a new workout</h3>
    <label>Exercise Title:</label>
    <input className={emptyFields.includes("title")?"error":""} type='text' value={title} onChange={e=> setTitle(e.target.value)}/>
    
    <label>Load (in kg):</label>
    <input className={emptyFields.includes("load")?"error":""} type='number' value={load} onChange={e=> setLoad(e.target.value)}/>
    
    <label>Reps:</label>
    <input className={emptyFields.includes("reps")?"error":""} type='number' value={reps} onChange={e=> setReps(e.target.value)}/>

    <button>Add Workout</button>
    {error &&<div className='error'>{error}</div>}

    </form>
  )
}

export default WorkoutForm
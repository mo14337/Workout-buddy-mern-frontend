import React from 'react'
import { useEffect, } from 'react'
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/authHook'
import { routePrefix } from '../helper/helper'

function Home() {
    const {workouts,dispatch}=useWorkoutContext()
    const {user}=useAuthContext()
    const test=`${routePrefix}/api/workouts`
    console.log(test);

    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await fetch(`${routePrefix}/api/workouts`,
          {
            headers:{
              "Authorization":`Bearer ${user.token}`
            }
          })
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
          }
        }
          if(user){

            fetchWorkouts()
          }
      }, [dispatch,user])
  return (
    <div className='home'>
        <div className='workouts'>
            {workouts && workouts.map((workout)=>(
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home
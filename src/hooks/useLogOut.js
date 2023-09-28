import { useAuthContext } from "./authHook"
import { useWorkoutContext } from "./useWorkoutContext"


export const useLogout=()=>{

    const {dispatch}=useAuthContext()
    const {dispatch:workoutDispatch}=useWorkoutContext()
    const logout=()=>{
        // removeing user from localstorage
        localStorage.removeItem("user")

        //empty use State
        dispatch({type:"LOGOUT"})
        workoutDispatch({type:"SET_WORKOUTS",payload:null})

        
    }

    return {logout}
}
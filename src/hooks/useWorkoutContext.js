import { WorkoutsContext } from "../context/workoutsContext";
import { useContext } from "react";

export const useWorkoutContext=()=>{
    const context=useContext(WorkoutsContext)
    return context;
}
import { useDispatch, useSelector } from "react-redux"
import { Dec, Inc, Reset } from "./CounterSlice"

export const Counter=()=>{
    let count=useSelector(state=>state.Counter)
    let dispatch=useDispatch()
    return(
        <>
        <center>
            <h1>Counter with redux</h1>
            <h2>Counter:{count}</h2>
            <button className="btn btn-primary m-2" onClick={()=>dispatch(Inc())}>Increment</button>
            <button className="btn btn-warning m-2" onClick={()=>dispatch(Dec())}>Decrement</button>
            <button className="btn btn-danger m-2" onClick={()=>dispatch(Reset())}>Reset</button>
        </center>
        </>
    )
}
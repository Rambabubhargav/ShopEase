import { useState } from "react"
import { Signup } from "../Features/Authentication/Signup"
import { Login } from "../Features/Authentication/Login"

export const Contact = () => {
    let [page,setPage]=useState(true)
    return (
        <>
            <center>
                <button className="btn btn-warning mt-4 m-2" onClick={()=>{setPage(true)}}>Signup</button>
                <button className="btn btn-danger mt-4 m-2" onClick={()=>{setPage(false)}}>Login</button>
            </center>
            {page?<Signup/>:<Login/>}
        </>
    )
}
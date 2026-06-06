import { Users } from "../Utilities/Users"
import { Child } from "./Child"

export const Parent =()=>{
    let data ="This is Props"
    return(
        <>
        <center>
         <div className="d-flex flex-wrap justify-content-center">

                {
                    Users.map((item) => (

                        <Child key={item.id}
                            name={item.name}
                            role={item.role}/>

                    ))
                }

            </div>

        </center></> 
    )
}
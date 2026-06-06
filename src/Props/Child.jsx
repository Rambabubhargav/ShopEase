import { Subchild } from "./Subchild"

export const Child=({name,role})=>{
    return(
        <>
        <center> <div className="card b-10 m-3 p-3" style={{ width: "18rem" }}>

                <div className="card-body">

                    <h3>{name}</h3>

                    <p>{role}</p>

                    <button className="btn btn-warning">
                        View
                    </button>

                </div>

            </div></center></>
    )
}
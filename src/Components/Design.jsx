import Hello from "../assets/hero.png"
export const Design=()=>{
    let image="https://static.toiimg.com/thumb/75503656/Astro-day.jpg?width=636&height=358&resize=4"
    return(
        <>
       <center> <div className="card" style={{ width: "18rem" }}>

                <div className="card-body">

                    <h5 className="card-title">
                        Card Title
                    </h5>

                    <p className="card-text">
                        Some quick example text to build on the card title.
                    </p>

                    <a href="#" className="btn btn-primary">
                        Go somewhere
                    </a>

                </div>
            </div></center>
        </>
    )

}
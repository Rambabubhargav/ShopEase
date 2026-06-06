import { useLocation } from "react-router-dom"
import { Footer } from "../Components/Footer"
import { Header } from "../Components/Header"
import { AppRouter } from "../RouterDom/AppRouter"

export const MainLayout=()=>{
    let location=useLocation()
    let hide=['/']
    let view =hide.includes(location.pathname)
    return (
        <>
        {!view && <Header/>}
        <AppRouter/>
        {!view && <Footer/>}
        </>
    )
}
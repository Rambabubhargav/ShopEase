import { configureStore } from "@reduxjs/toolkit";
import Counteropr from "../Redux/Counter/CounterSlice"
import Cartopr from "../Redux/Cart/CartSlice"
export default configureStore({
    reducer:{
        Counter:Counteropr,
        cart:Cartopr
    }
})
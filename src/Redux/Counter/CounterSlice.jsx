import { createSlice } from "@reduxjs/toolkit";

let counterSlice=createSlice({
    name:"Counter",
    initialState:0,
    reducers:{
        Inc:((state,action)=>{
            return state + 1
        }),
        Dec:((state,action)=>{
            return state - 1
        }),
        Reset:((state,action)=>{
            return 0
        })
    }

})
export const {Inc,Dec,Reset} = counterSlice.actions
export default counterSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

let Cartdata = JSON.parse(localStorage.getItem("Cartdata")) || [];

let cartslice = createSlice({
    name: "cart",
    initialState: Cartdata,

    reducers: {
        AddtoCart: (state, action) => {
            let product = action.payload;

            let existingitem = state.find(
                (item) => item.id === product.id
            );

            if (existingitem) {
                existingitem.quantity += 1;
            } else {
                state.push({
                    ...product,
                    quantity: 1,
                });
            }

            localStorage.setItem(
                "Cartdata",
                JSON.stringify(state)
            );
        },

        IncrementQty: (state, action) => {
            let id = action.payload;

            let existingitem = state.find(
                (item) => item.id === id
            );

            if (existingitem) {
                existingitem.quantity += 1;
            }

            localStorage.setItem(
                "Cartdata",
                JSON.stringify(state)
            );
        },
        RemovefromCart: (state, action) => {
            let id = action.payload;    
            let updatedcart = state.filter((item) => item.id !== id);
            localStorage.setItem("Cartdata", JSON.stringify(updatedcart));
            return updatedcart;
        },
        

        DecrementQty: (state, action) => {
            let id = action.payload;

            let existingitem = state.find(
                (item) => item.id === id
            );

            if (
                existingitem &&
                existingitem.quantity > 1
            ) {
                existingitem.quantity -= 1;
            }

            localStorage.setItem(
                "Cartdata",
                JSON.stringify(state)
            );
        },
    },
});

export const {
    AddtoCart,
    IncrementQty,
    DecrementQty,
    RemovefromCart,
} = cartslice.actions;

export default cartslice.reducer;
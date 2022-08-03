import { createSlice } from "@reduxjs/toolkit";

let initialState = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : {
    products: [],
    totalItems: 0,
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.totalItems += action.payload.quantity;
            state.total += action.payload.quantity * action.payload.price;
            const existingCartItemIndex = state.products.findIndex(item => item._id === action.payload._id);
            const existingCartItem = state.products[existingCartItemIndex];
            if (existingCartItem) {

                state.products[existingCartItemIndex].quantity += action.payload.quantity
            }
            else {
                state.products.push(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((item) => item._id !== action.payload._id);
            state.total -= action.payload.price * action.payload.quantity;
            state.totalItems -= action.payload.quantity;
            localStorage.setItem("cart", JSON.stringify(state));
        },
        setCart: (state) => {
            state.products = [];
            state.totalItems = 0;
            state.total = 0;
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }
});

export const { addProduct, removeProduct, setCart } = cartSlice.actions;

export default cartSlice.reducer;
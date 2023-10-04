'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface ICartItem extends IProductModel {
    quantity: number;
}

export interface InitialCartItem {
    loading: boolean;
    error?: string;
    cartItem: ICartItem[];
};

const initialState: InitialCartItem = {
    loading: false,
    error: undefined,
    cartItem: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (s, a: PayloadAction<ICartItem>) => {
            const newItem = a.payload;
            const existing = s.cartItem.find(itm => itm.id === a.payload.id);
            const cartItem = existing
                ? s.cartItem.map(itm => itm.id === existing.id
                    ? { ...newItem, quantity: itm.quantity + newItem.quantity }
                    : itm)
                : [...s.cartItem, newItem];
            return { ...s, cartItem };
        },
        increaseQuantity: (state, action) => {
            const existing = state.cartItem.find(item => item.id === action.payload.id);
            existing && existing.quantity++;
        },
        decreaseQuantity: (state, action) => {
            const existing = state.cartItem.find(item => item.id === action.payload.id);
            existing && existing.quantity++;
        },
        dropTheCart: (s, a: PayloadAction<ICartItem>) => {
            const updateCart: ICartItem[] = s.cartItem.filter(field => field.id !== a.payload.id);
            return { ...s, cartItem: updateCart };
        },
        resetToCart: (s) => {
            s.cartItem = [];
            return { ...s };
        },
    }
});
export const { 
    addToCart,
    dropTheCart, 
    decreaseQuantity,
    increaseQuantity,
    resetToCart
} = cartSlice.actions;
export const cartSelect = (state: AppState) => state.cartReduce;
export default cartSlice.reducer;
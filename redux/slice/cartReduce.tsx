'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";


export interface InitialCartItem {
    loading: boolean;
    error?: string;
    cartItem: IStoreProduct[];
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
        addToCart: (state, a: PayloadAction<IStoreProduct>) => {
            const newItem = a.payload;
            const existing = state.cartItem.find(itm => itm.id === a.payload.id);
            console.log({ action: a });
            const cartItem = existing
                ? state.cartItem.map(itm => itm.id === existing.id
                    ? { ...newItem, quantity: itm.quantity + newItem.quantity }
                    : itm)
                : [...state.cartItem, newItem];
            console.log(cartItem);
            return { ...state, cartItem };
        },
        increaseQuantity: (state, action: PayloadAction<{ id: string; }>) => {
            const existing = state.cartItem.find(item => item.id === action.payload.id);
            existing && existing.quantity++;
        },
        decreaseQuantity: (state, action: PayloadAction<{ id: string; }>) => {
            const existing = state.cartItem.find(item => item.id === action.payload.id);
            existing && existing.quantity--;
        },
        dropTheCart: (s, a: PayloadAction<{ id: string; }>) => {
            const updateCart: IStoreProduct[] = s.cartItem.filter(field => field.id !== a.payload.id);
            return { ...s, cartItem: updateCart };
        },
        resetToCart: (s) => {
            s.cartItem = [];
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
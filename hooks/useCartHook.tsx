import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { logger } from './logger-zutand';
export interface InitialCartItem {
    loading: boolean;
    error?: string;
    cartItem: IStoreProduct[];
}

export const initialState: InitialCartItem = {
    loading: false,
    cartItem: []
};

export const useStoreCartStore = create<InitialCartItem>()(
    devtools(
        persist(
            logger((set, get) => ({
                loading: false,
                cartItem: [],
                addToCart: (payload: IStoreProduct) => {
                    set(state => {
                        const newItem = payload;
                        const existing = state.cartItem.find(itm => itm.id === payload.id);
                        const cartItem = existing
                            ? state.cartItem.map(itm => itm.id === existing.id
                                ? { ...newItem, quantity: itm.quantity + newItem.quantity }
                                : itm)
                            : [...state.cartItem, newItem];
                        console.log(cartItem);
                        return { ...state, cartItem };
                    });
                },
                increaseCart: (id: string) => {
                    const existing = get().cartItem.find(item => item.id === id);
                    existing && existing.quantity++;
                    set((state) => {
                        return {
                            ...state,
                            cartItem: [...state.cartItem, existing]
                        };
                    });
                }

            }), 'store-cart-item'),
            {
                name: "store-cart-item",
                storage: createJSONStorage(() => sessionStorage)
            }
        ),
    )
);

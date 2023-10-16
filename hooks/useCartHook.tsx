import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { logger } from './logger-zutand';
export interface InitialCartItem {
    loading: boolean;
    error?: string;
    cartItem: IStoreProduct[];
    addToCart: (payload:IStoreProduct) => void;
    increaseCart: (id:string) => void;
    decreaseCart: (id:string) => void;
    removeCart: (id:string) => void;
    resetCart: () => void;
}

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
                        return { ...state, cartItem };
                    });
                },
                increaseCart: (id: string) => {
                    const updateCart = get().cartItem.map(item => {
                        if (item.id === id) {
                            item.quantity++;
                        }
                        return item;
                    });
                    set((state) => ({ ...state, cartItem: updateCart }))
                },
                decreaseCart: (id: string) => {
                    const updateCart = get().cartItem.map(item => {
                        if (item.id === id) {
                            item.quantity--;
                        }
                        return item;
                    });
                    set((state) => ({ ...state, cartItem: updateCart }))
                },
                removeCart: (id: string) => set((state) => ({ ...state, cartItem: get().cartItem.filter(itm => itm.id !== id) })),
                resetCart: () => set(state => ({ ...state, cartItem: [] })),
            }), 'store-cart-item'),
            {
                name: "store-cart-item",
                storage: createJSONStorage(() => sessionStorage)
            }
        ),
    )
);

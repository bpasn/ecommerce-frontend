import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ImageSessionStorage {
    images: { image: string }[];
    setImage: (...image: string[]) => void;
}

export const useStoreImageSessionStore = create<ImageSessionStorage>()(
    devtools(
        persist(
            (set, get) => ({
                images: [],
                setImage: (image: string) => set({ images: [...get().images, { image }] }),
                remove: () => set({ images: [] })
            }), {
            name: "store-cart-item",
            storage: createJSONStorage(() => sessionStorage)
        }
        )
    )
)


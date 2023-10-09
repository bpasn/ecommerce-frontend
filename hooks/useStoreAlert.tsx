import { alertVariants } from "@/components/ui/alert";
import { type VariantProps } from "class-variance-authority";
import { create } from "zustand";



export type StoreAlertVariant = "error" | "success";
export interface UseStoreAlert {
    show: boolean;
    title: StoreAlertVariant;
    description: string | null;
    onShow: (title: StoreAlertVariant, description: string) => void;
    onHide: () => void;
};

export const useStoreAlert = create<UseStoreAlert>(set => ({
    show: false,
    title: "error",
    description: null,
    onHide: () => set(() => ({ show: false, title: "success", description: null })),
    onShow: (title: StoreAlertVariant, description: string) => set(() => ({ show: true, title: title, description: description }))
}));
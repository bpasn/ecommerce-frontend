import { create } from 'zustand';

interface useStoreModalStoreForm {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useStoreModalForm = create<useStoreModalStoreForm>(set => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}));
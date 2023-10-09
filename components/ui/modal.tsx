'use client';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    size?:"sm" | "md" | "lg"
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    size = "md"
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent style={{
                width: size==="md" ? "700px": size === "lg" ? "900px" : "300px"
            }}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
export default Modal;
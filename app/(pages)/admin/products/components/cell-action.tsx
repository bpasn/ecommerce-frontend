"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { useState } from "react";
import axios from "axios";

interface CellProps {
    data: ProductColumns;
}


export const CellAction: React.FC<CellProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Product Id copied to the clipboard");
    };

    const onDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/categories/${data.id}`);
            window.location.reload();
        } catch (error:any) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }else{
                toast.error(error.message)
            }
        } finally {
            setLoading(false);
            setOpen(false)
        }
    };
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(!open)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* Open menu */}
                    <Button
                        variant={"ghost"}
                        className="h-8 w-8 p-0 border"
                    >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4 " />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        router.push(`/admin/categories/${data.id}`);
                    }}>
                        <Edit className="mr-2 h4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(!open)}>
                        <Trash className="mr-2 h4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

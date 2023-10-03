"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { useState } from "react";

interface CellProps {
    data: BillboardColumns;
}


export const CellAction: React.FC<CellProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard Id copied to the clipboard");
    };

    const onDelete = () => {}
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
                    <Button
                        variant={"ghost"}
                        className="h-8 w-8 p-0"
                    >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-2 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h4 w-4" />
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                        <Edit className="mr-2 h4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Trash className="mr-2 h4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

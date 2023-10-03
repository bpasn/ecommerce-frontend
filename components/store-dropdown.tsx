"use client";
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Props = {}

const StoreDropDown = (props: Props) => {
    const menu: string[] = ["Profile", "Billing", "Team", "Subscription"];

    const [select,setSelect] = useState<string>();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent  className="mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {menu.map(m=> (<DropdownMenuItem onClick={() => setSelect(m)} className={cn("cursor-pointer",select && select === m ? "bg-gray-300 hover:bg-gray-300" : "bg-transparent")}>{m}</DropdownMenuItem>))}
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StoreDropDown
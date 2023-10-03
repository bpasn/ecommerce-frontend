"use client";
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

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
                <DropdownMenuItem className={"cursor-pointer"}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => signOut()}>LogOut</DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StoreDropDown
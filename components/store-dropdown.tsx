"use client";
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '@/redux/store';
interface StoreDropDownProps {

};

const StoreDropDown: React.FC<
    StoreDropDownProps
    & ReduxStoreDropDownProps
> = ({
    cartItem
}) => {
        const { data: session } = useSession();
        const router = useRouter();
        return (
            <>
                {!session?.user
                    ? (
                        <Button onClick={() => signIn()} variant={"outline"}>
                            Sign In
                        </Button>
                    )
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-5 w-56">
                                {session && session.user.isAdmin && <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push("/admin")}>Admin</DropdownMenuItem>}
                                <DropdownMenuItem className={"cursor-pointer"}>Orders History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => signOut()}>LogOut</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    )

                }
            </>

        );
    };

const mapState = (state: AppState) => ({
    cartItem: state.cartReduce.cartItem
});
const reduxMapper = connect(mapState);
type ReduxStoreDropDownProps = ConnectedProps<typeof connect>;
export default reduxMapper(StoreDropDown); // what is means connect(() => StoreDropDown)
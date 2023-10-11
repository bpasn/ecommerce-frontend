'use client';
import React from 'react';
import StoreDropDown from '../store-dropdown';
import StoreSwitcherApi from '../api/store-switcher-api';
import Link from 'next/link';
import { AlignJustify, ShoppingCartIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import MainNavClient from './MainNavClient';
import { useAppSelector } from '@/hooks/useReduxHook';
import { cartSelect } from '@/redux/slice/cartReduce';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import router from 'next/router';
import session from 'redux-persist/es/storage/session';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import Sidebar from './Sidebar';

type Props = {};

const NavbarClient = (props: Props) => {
    const { cartItem } = useAppSelector(cartSelect);

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNavClient className='mx-6 hidden md:block' />
                <StoreSwitcherApi
                    className={cn("hidden md:flex")}
                    placeholderSearch='Search Product'
                    heading={'Search product'} />

                {/* NAV BAR MOBILE */}
                <Sidebar />
                {/* NAV BAR DESKTOP */}
                <div className='ml-auto flex items-center space-x-4'>
                    {/* cart */}
                    <Link
                        href="/carts"
                        className='flex items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] px-2 relative'
                    >
                        <ShoppingCartIcon />
                        <Badge className='absolute -top-3 left-4 rounded-full border-transparent' variant={"outline"}>
                            {cartItem.length}
                        </Badge>
                    </Link>
                    {/* dropdown */}
                    <StoreDropDown />
                </div>

            </div>
        </div>
    );
};
export default NavbarClient;
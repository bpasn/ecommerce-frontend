import React from 'react';
import StoreDropDown from '../store-dropdown';
import StoreSwitcherApi from '../api/store-switcher-api';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import MainNavClient from './MainNavClient';

type Props = {};

const NavbarClient = (props: Props) => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MainNavClient className='mx-6' />
                <StoreSwitcherApi
                    placeholderSearch='Search Product'
                    heading={'Search product'} />
                <div className='ml-auto flex items-center space-x-4'>
                    {/* cart */}
                    <Link
                        href="/cart"
                        className='flex items-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] px-2 relative'
                    >
                        <ShoppingCartIcon />
                        <Badge className='absolute -top-3 left-4 rounded-full border-transparent' variant={"outline"}>
                            2
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
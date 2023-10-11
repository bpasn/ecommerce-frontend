'use client';
import { AlignJustify, ShieldClose, X } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';


const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className='block md:hidden'>
            {/* <!-- drawer init and show --> */}
            <div className="text-center">
                <Button size={"icon"} onClick={() => setOpen(!open)}
                    type="button"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation">
                    <AlignJustify className='w-4 h-4' />
                </Button>
            </div>

            {/* <!-- drawer component --> */}
            <div id="drawer-navigation" className={
                cn(
                    !open && "-translate-x-full",
                    "fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform  bg-white dark:bg-gray-800"
                )
            } tabIndex={-1} aria-labelledby="drawer-navigation-label">
                <Button type="button" size={"icon"} onClick={() => setOpen(!open)} data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <X />
                </Button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
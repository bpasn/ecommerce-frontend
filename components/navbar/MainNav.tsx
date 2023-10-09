'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {

}

const MainNav: React.FC<MainNavProps> = ({
    className,
    ...props
}) => {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/admin/billboards`,
            label: "Billboard",
            active: pathname === `/admin/billboards`
        },
        {
            href: `/admin/categories`,
            label: "Categories",
            active: pathname === `/admin/categories`
        },
    ];
    return (
        <nav className={cn("flex items-center space-x4 lg:space-x-6", className)}>
            {routes.map(route => (
                <Link
                    href={route.href}
                    key={route.href}
                    className={cn("text-md font-medium mr-2 transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );


};

export default MainNav;

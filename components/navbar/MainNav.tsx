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
            href: `/`,
            label: "Home",
            active: pathname === `/`
        },
        {
            href: `/admin/categories`,
            label: "Categories",
            active: pathname === `/admin/categories`
        },
        {
            href: `/admin/sub-categories`,
            label: "Sub Categories",
            active: pathname === `/admin/sub-categories`
        },
        {
            href: `/admin/brand`,
            label: "Brands",
            active: pathname === `/admin/brand`
        },
        {
            href: `/admin/products`,
            label: "Products",
            active: pathname === `/admin/products`
        },
        {
            href: `/admin/orders`,
            label: "Orders",
            active: pathname === `/admin/orders`
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

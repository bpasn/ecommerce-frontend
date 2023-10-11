'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

interface MainNavClientProps extends React.HTMLAttributes<HTMLElement> {

}

const MainNavClient: React.FC<MainNavClientProps> = ({
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
            href: `#`,
            label: "Categories",
            active: pathname === `/categories`
        },
        {
            href: `#`,
            label: "Products",
            active: pathname === `/products`
        },
    ];

    return (
        <nav className={cn("flex items-center space-x4 lg:space-x-6", className)}>
            {routes.map(route => (
                <Link
                    href={route.href}
                    key={route.label}
                    className={cn("text-md font-medium mr-2 transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                    {route.label}
                </Link>
            ))}
        </nav>
    );


};

export default MainNavClient;

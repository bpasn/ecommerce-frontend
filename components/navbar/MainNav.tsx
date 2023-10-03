'use client';
import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

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
            href: `/${params.storeId}/settings`,
            label: "Setting",
            active: pathname === `/${params.storeId}/settings`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboard",
            active: pathname === `/${params.storeId}/billboard`
        }
    ]
    return (
        <nav className={cn("flex items-center space-x4 lg:space-x-6", className)}>
            {routes.map(route => (
                <Link 
                href={route.href} 
                key={route.href} 
                className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground") }>
                    {route.label}
                </Link>
            ))}
        </nav>
    )


}

export default MainNav

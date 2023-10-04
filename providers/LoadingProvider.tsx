'use client';

import Backdrop from "@/components/ui/backdrop";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { Suspense, useEffect, useState } from "react";

type Props = {};

const LoadingProvider: React.FC<{
    children: React.ReactNode;
}> = ({
    children
}) => {
        const [loading, setLoading] = useState<boolean>(false);
        const [isMounted, setIsMounted] = useState(false);
        Router.events.on("routeChangeStart", _ => {
            console.log("ROUTE CHANGE START");
            setLoading(true);
        });
        Router.events.on("routeChangeComplete", _ => {
            console.log("ROUTE CHANGE START");
            setLoading(false);
        });
        Router.events.off("routeChangeStart", (url) => {
            console.log({ url });
        });
        const route = useRouter();
        useEffect(() => {
            setIsMounted(true);
        }, []);
        if (!isMounted) return null;
        return (
            <Suspense fallback={<Backdrop />}>
                {loading && <Backdrop />}
                {children}
            </Suspense>
        );
    };

export default LoadingProvider;
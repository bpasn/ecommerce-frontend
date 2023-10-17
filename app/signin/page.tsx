'use client';
import React from 'react';
import { UserAuthForm } from './components/sign-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {};

const SigninPage = (props: Props) => {
    const router = useRouter();
    const query = useSearchParams();
    const { data: session } = useSession();
    const redirect = query?.get("redirect");
    React.useEffect(() => {
        if (session?.user) {
            router.push(redirect as string || '/');
        }
    }, [router, session, redirect]);
    return (
        <>
            <div className="container flex items-center justify-center h-full">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <UserAuthForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SigninPage;
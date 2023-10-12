'use client';

import { useAppSelector } from "@/hooks/useReduxHook";
import { cn, formatter } from "@/lib/utils";
import { cartSelect } from "@/redux/slice/cartReduce";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartItem from "./components/cartItem";
import { Button } from "@/components/ui/button";

const CartPage = () => {
    const { cartItem } = useAppSelector(cartSelect);
    return (
        <div className={" mx-auto"}>
            <div className="px-6 py-4">
                <h1 className="text-2xl mb-4 mt-4">Shipping Cart</h1>
                {!cartItem.length
                    ? (
                        <div>
                            Cart is Empty  <Link href={"/"} className="">Go to Shopping</Link>
                        </div>
                    )
                    : (
                        <div className="grid md:grid-cols-4 mdl:gap-5">
                            <div className="bg-white overflow-x-auto col-span-4 lg:col-span-3 p-4 rounded-lg border gap-4">
                                {cartItem.map(cart => (
                                    <div key={cart.id} className="pt-2 flex flex-col gap-2">
                                        <CartItem cartItem={cart} />
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white overflow-x-auto col-span-4 lg:col-span-1 p-4 rounded-lg border mt-2 md:mt-0 h-2/3 gap-3 flex flex-col">
                                <h1 className="text-xl font-bold">Place to order</h1>
                                <div className="text-md">total : {formatter.format(cartItem.reduce((qty, itm) => Number(+itm.price * itm.quantity), 0))}</div>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >Place To Order</Button>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default CartPage;
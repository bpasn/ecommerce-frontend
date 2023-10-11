'use client';

import { useAppSelector } from "@/hooks/useReduxHook";
import { cn } from "@/lib/utils";
import { cartSelect } from "@/redux/slice/cartReduce";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
    const { cartItem } = useAppSelector(cartSelect);
    return (
        <div className={"max-w-screen-2xl mx-auto"}>
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
                            <div className="bg-white overflow-x-auto mdl:col-span-3 p-4 rounded-lg border gap-4">
                                <h1 className="text-md mb-4">Cart Item</h1>
                                {cartItem.map(cart => (
                                    <div
                                        key={cart.id}
                                        className="border-t border-b mb-2 p-4 rounded-md grid grid-cols-1 sml:grid-cols-3 gap-4">
                                        <Image
                                            objectFit="cover"
                                            src={cart.image}
                                            width={150}
                                            height={150}
                                            alt="cartImage"
                                            className="h-[150px] object-fill"
                                        />
                                        <div className="grid sml:flex grid-cols-1 sml:gap-5  items-center px-2 gap-4">
                                            <div className="grid-cols-4 sml:flex flex-col gap-2">
                                                <p className="text-lg font-semibold text-amazon_blue">{cart.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {cart.description.length > 100
                                                        ? cart.description.substring(0, 100) + "..."
                                                        : cart.description}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Unit Price{" "}
                                                    <span className="font-semibold text-amazon_blue">
                                                        {cart.price}
                                                    </span>
                                                </p>
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center  mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                                                        <span onClick={() => { }}
                                                            className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
                                                            <Plus />
                                                        </span>
                                                        <span>{cart.quantity}</span>
                                                        <span onClick={() => {
                                                            if (cart.quantity <= 1) {
                                                                const comfirm = window.confirm("Are your sure to remove this product from the cart!");
                                                                if (comfirm) {
                                                                    // deleteProduct(item._id);
                                                                }
                                                                return;
                                                            }
                                                            // decreaseQuantity(item._id);
                                                        }} className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
                                                            <Minus />
                                                        </span>
                                                    </div>
                                                    <div
                                                        onClick={() => { }}
                                                        className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                                                        <X className="mt-[2px]" /> <p>remove</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-lg font-semibold text-amazon_blue">
                                                {+cart.price * cart.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white overflow-x-auto p-4 rounded-lg border mt-2 md:mt-0">
                                This will be to render placeOrder
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default CartPage;
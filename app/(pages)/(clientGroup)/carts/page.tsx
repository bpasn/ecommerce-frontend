'use client';
import { formatter, wait } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItem from './components/cartItem';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { OrderCreate } from "@/src/pages/api/orders";
import { useRouter } from "next/navigation";
import { useStoreCartStore } from "@/hooks/useCartHook";

const CartPage = () => {
    const { cartItem,resetCart } = useStoreCartStore();
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const createOrder = async () => {
        setLoading(true);
        try {
            await axios.post<IResponse, any, OrderCreate>("/api/orders", {
                total: cartItem.reduce((_, c) => (Number(c.price) * c.quantity), 0),
                orderItem: cartItem.map(c => ({ productId: c.id, quantity: c.quantity }))

            });
            resetCart();
            toast.success("create order success");
            await wait(1.5 * 1000);
            route.push("/orders/history");
        } catch (error) {
            console.log(error);
            toast.error("Opp someting worng!");
        } finally {
            setLoading(false);
        }
    };
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
                                {cartItem.map((cart: IStoreProduct) => (
                                    <div key={cart.id} className="pt-2 flex flex-col gap-2">
                                        <CartItem cartItem={cart} />
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white overflow-x-auto col-span-4 lg:col-span-1 p-4 rounded-lg border mt-2 md:mt-0 max-h-[150px] gap-3 flex flex-col">
                                <div className="card p-5">
                                    <ul className="flex flex-col justify-between">
                                        <li>
                                            <div className="pb-3 text-xl">
                                                Subtotal ({cartItem?.reduce((a: number, c: IStoreProduct) => a + c.quantity, 0)}) : {
                                                    formatter.format(cartItem?.reduce((a: number, c: IStoreProduct) => a + c.quantity * +c.price, 0))
                                                }
                                            </div>
                                        </li>
                                        <li>
                                            <Button
                                                disabled={loading}
                                                variant={"outline"}
                                                onClick={createOrder}
                                                className="primary-button w-full"
                                            >
                                                {loading ? (
                                                    <div className="flex gap-3">
                                                        Processing
                                                        <div
                                                            style={{ borderTopColor: "transparent" }}
                                                            className="w-4 h-4 border-4 border-gray-400 border-dotted rounded-full animate-spin" />

                                                    </div>

                                                ) : "Check Out"}
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>);
};

export default CartPage;
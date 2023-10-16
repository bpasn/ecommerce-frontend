'use client';
import { useStoreCartStore } from "@/hooks/useCartHook";
import { cn, formatter } from "@/lib/utils";
import { Plus, Minus, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const CartItem: React.FC<{
    cartItem: IStoreProduct
}> = ({
    cartItem,
}) => {
        const storeCart = useStoreCartStore();
        return (
            <div className="border mb-2 p-4 rounded-md grid grid-cols-1 sml:grid-cols-3 gap-4">
                <Image
                    src={cartItem.images[0]}
                    alt="cartItemImage"
                    width={150}
                    height={150}
                    className="object-contain h-full"
                />
                <div className="flex flex-col">
                    <p className={cn("text-sml md:text-xl")}>{cartItem.name}</p>
                    <p className={cn("text-xs md:text-sm py-2")}>cartItem.description.substring(0, 100)</p>

                    <div className="flex items-center gap-6">
                        <div className="
                        flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg
                        ">
                            <span
                                onClick={() => {
                                    if (cartItem.quantity >= cartItem.qty) {
                                        toast.error("Out stock")
                                        return
                                    }
                                    storeCart.increaseCart(cartItem.id)
                                }}
                                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer">
                                <Plus />
                            </span>
                            <span>{cartItem.quantity}</span>
                            <span
                                onClick={() => {
                                    if (cartItem.quantity <= 1) {
                                        const confirm = window.confirm("Are your sure to remove this product from the cart!")
                                        if (confirm) {
                                            storeCart.removeCart(cartItem.id)
                                        }
                                        return
                                    }
                                    storeCart.decreaseCart(cartItem.id)
                                }}
                                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer">
                                <Minus />
                            </span>
                        </div>
                        <div onClick={() => storeCart.removeCart(cartItem.id)} className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                            <X className="mt-[2px]" /> <p>remove</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className={cn("text-sml md:text-xl")}>{formatter.format(Number(+cartItem.price * cartItem.quantity))}</p>
                </div>
            </div>
        )
    }


// code using redux
{/**
*! const mapperDispatch = (dispatch: AppDispatch) => {
*!     return ({
*!         increaseQuantity: (id: string) => dispatch(increaseQuantity({ id })),
*!         decreaseQuantity: (id: string) => dispatch(decreaseQuantity({ id })),
*!         dropTheCart: (id: string) => dispatch(dropTheCart({ id }))
*!     })
*! }
*! const mapState = (state: AppState) => ({
*!     cart:state.cartReduce
*! })
*! const connector = connect(
*!     mapState,
*!     mapperDispatch)
*! type PropsFromRedux = ConnectedProps<typeof connector>
 */}
export default CartItem
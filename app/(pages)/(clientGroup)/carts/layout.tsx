import { Suspense } from "react";
import Loading from "../loading";

interface CartLayoutProps {
    children: React.ReactNode;
}

const CartLayout: React.FC<CartLayoutProps> = ({
    children
}) => {
    return (<Suspense fallback={<Loading />}>{children}</Suspense>);
};

export default CartLayout;
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import ProductDetail from './component/ProductDetail';
import { wait } from '@/lib/utils';

interface ProductDetailPageProps {
    params: {
        productId: string;
    };
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = async ({
        params
    }) => {
        const { data: { payload: product } } = await axios.get<IResponseBase<IProductModel>>(`http://localhost:3000/api/products/${params.productId}`);
        return (
            <div>
                <div className='max-w-screen-xl mx-auto px-4 py-4 md:py-10'>
                    <Suspense fallback={
                        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
                            <p>Your product is Loading...</p>
                            <Loader color='#131921' size={40} />
                        </div>
                    } >
                        <ProductDetail product={product} />
                    </Suspense>
                </div>
            </div>
        );
    };

export default ProductDetailPage;

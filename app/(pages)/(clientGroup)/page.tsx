import Banner from '@/components/Banner';
import ProductItem from './product/components/product-item';
import axios from 'axios';
import { wait } from '@/lib/utils';

interface ClientPageProps {

}

const ClientPage: React.FC<ClientPageProps> = async ({
}) => {
  const { data: product } = await axios.get<IResponseBase<IProductModel[]>>("http://localhost:3000/api/products");

  return (
    <main  className="max-w-screen-2xl mx-auto">
      <Banner />
      <div>
        <div className="relative sml:mt-[3rem] md:mt-[6rem] lg:mt-[8rem] z-11 mb-10">
          <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {product.payload.map((product, i) => <ProductItem key={i} product={product} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientPage;
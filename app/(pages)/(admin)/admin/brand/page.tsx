import prismadb from '@/lib/prismadb.util';
import { BrandColumns } from './components/brand-columns';
import { Brand } from '@prisma/client';
import { Metadata } from 'next';
import BrandClient from './components/brand-client';

export const metadata: Metadata = {
  title: "Brand",
  description: "Brand Page"
};
interface BrandPageProps {

}

const BrandPage: React.FC<BrandPageProps> = async () => {
  const brands = await prismadb.brand.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedBrands: BrandColumns[] = brands.map(itm => ({
    id: itm.id,
    name: itm.name,
    image: itm.image!
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandPage;
import { format } from 'date-fns';
import SubCategoryClient from './components/sub-category-client';
import prismadb from '@/lib/prismadb.util';
import { SubCategoryColumns } from './components/sub-category-columns';
import { Metadata } from 'next';
import { wait } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories Page"
};
interface SubCategoryPageProps {

}

const SubCategoryPage: React.FC<SubCategoryPageProps> = async ({ }) => {
  await wait(200)
  const subCategorys = await prismadb.subCategory.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: { category: true }
  });

  const formattedSubCategorys: SubCategoryColumns[] = subCategorys.map((item) => ({
    id: item.id as string,
    name: item.name,
    categoryName: item.category.name,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryClient data={formattedSubCategorys} />
      </div>
    </div>
  );
};

export default SubCategoryPage;
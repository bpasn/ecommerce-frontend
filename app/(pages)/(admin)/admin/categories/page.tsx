import { format } from 'date-fns';
import CategoryClient from './components/client';
import prismadb from '@/lib/prismadb.util';
import { CategoryColumns } from './components/category-columns';
import { Category } from '@prisma/client';
import { Metadata } from 'next';
import { wait } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories Page"
};
interface CategoryPageProps {
  params: {
    storeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params
}) => {
  await wait(200)
  const categorys: Category[] = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedCategorys: CategoryColumns[] = categorys.map((item: Category) => ({
    id: item.id as string,
    name: item.name,
    createdAt: format(item.createdAt, "MMM do, yyyy")
  }));

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategorys} />
      </div>
    </div>
  );
};

export default CategoryPage;
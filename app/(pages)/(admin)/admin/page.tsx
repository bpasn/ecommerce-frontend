type Props = {};

import { wait } from '@/lib/utils';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Admin",
    description: "Admin Page"
  };
const AdminRootPage = async (props: Props) => {
  return (
    <div>This will be the Admin Page</div>
  );
};

export default AdminRootPage;
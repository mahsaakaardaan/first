'use client';
import Link from 'next/link';
import Input from '../uikit/Input';
import { FiBell } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useSearch } from '@/app/search/components/searchContext';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';

export default function Navbar() {
  const currentOrders2 = useCurrentOrdersStore(
    (state) => state.currentOrders2
  );

  const shipmentCount = currentOrders2?.length;
  const router = useRouter();
  const { searched, setSearched } = useSearch();

  const params = new URLSearchParams({
    q: searched
  });

  const pathName = usePathname();
  const hiddenPaths = ['/login'];
  const shouldHide = hiddenPaths.includes(pathName);

  return (
    <div className={`flex items-center justify-between p-4 ${shouldHide ? 'hidden' : ''}`}>
      <div className="flex items-center gap-4 flex-1">
        {/* <Link href="/search"> */}
        <Link className="hidden md:block" href="/">
          LOGO
        </Link>
        <Input
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          isSearch={true}
          onFocus={() => router.push('/searched')}
          // onClick={() => router.push(`/search?${params.toString()}`)}
          // showButton={true}
        />
      </div>
      {/* actions */}
      <div className="flex items-center gap-2">
        <FiBell />
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={'/profile/my-orders'}>
            <FiUser />
          </Link>
          <Link href={'/shipment'} className="relative">
            {shipmentCount > 0 && (
              <div className="w-[20px] h-[20px] rounded-full bg-purple-400 text-white flex items-center justify-center absolute left-3 bottom-2">
                {shipmentCount}
              </div>
            )}
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}

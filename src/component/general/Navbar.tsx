'use client';
import Link from 'next/link';
import Input from '../uikit/Input';
import { FiBell } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { usePathname, useRouter } from 'next/navigation';
import { useSearch } from '@/app/search/components/searchContext';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';
import Image from 'next/image';
import NavBarSearch from './NavBarSearch';
import { toFaDigits } from '@/lib/nums';

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
  const isSocialDetailPage = /^\/social\/([^/]+)$/.test(pathName); 
const hiddenPaths = ['/login'];

const shouldHide = hiddenPaths.includes(pathName) || isSocialDetailPage;

  return (
    <div className={`flex items-center justify-between p-4 ${shouldHide ? 'hidden' : ''}`}>
      <div className="flex items-center gap-4 flex-1">
        {/* <Link href="/search"> */}
        <Link className="hidden md:block" href="/">
          <Image src={'/upcoffee.png'} alt="up_coffee" width={50} height={50} />
        </Link>
        {/* <Input
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          isSearch={true}
          onFocus={() => router.push('/searched')}
        /> */}
        <NavBarSearch />

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
              <div className="w-[20px] h-[20px] rounded-full bg-semi-green text-white flex items-center justify-center absolute left-3 bottom-2 font-sans">
                {toFaDigits(shipmentCount)}
              </div>
            )}
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}

import Navbar from '@/component/general/Navbar';
import { SearchProvider } from './components/searchContext';

export const metadata = {
  title: 'Search Detail'
};

export default function SearchDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  ); // 👈 No `@search` slot here!
}

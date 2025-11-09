import Navbar from '@/component/general/Navbar';
import { SearchProvider } from './components/searchContext';

export const metadata = {
  title: 'Search Detail',
  other: {
    'google-site-verification':
      'YGvfmPjp3sRVEVV11-gadtZWDP0fUKs0NekXyPsfOt0'
  }
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

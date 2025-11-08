'use client';
import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext<
  | {
      searched: string;
      setSearched: (value: string) => void;
    }
  | undefined
>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searched, setSearched] = useState('');
  return (
    <SearchContext.Provider value={{ searched, setSearched }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error('useSearch must be used inside SearchProvider');
    }
    return context;
  };

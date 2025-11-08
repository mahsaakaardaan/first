'use client';
import { VariantType } from '@/lib/types';
import {
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react';

export type ColorContextType = {
  color: VariantType | undefined;
  setColor: (newSession: VariantType) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(
  undefined
);

export const ColorProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [color, setColor] = useState<VariantType | undefined>();
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext<ColorContextType | undefined>(
    ColorContext
  );
  if (!context) throw new Error('error in color context');
  return context;
};

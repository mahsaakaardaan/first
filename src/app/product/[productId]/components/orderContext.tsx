'use client';
import { useCurrentOrdersStore } from '@/lib/store/CurrentOrdersStore';
import { useUserStore } from '@/lib/store/userStore';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const OrderContext = createContext({});

export const OrderProvider = ({
  children,
  token,
  currents,
  user
}: {
  children: ReactNode;
  token: string;
  currents: any[];
}) => {
  const [currentOrders, setCurrentOrders] = useState<any[]>([]);
  const setCurrentOrders2 = useCurrentOrdersStore(
    (state) => state.setCurrentOrders2
  );

  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setCurrentOrders(currents);
    setCurrentOrders2(currents);
    user?.data && setUser(user?.data);
  }, [user]);
  return (
    <OrderContext.Provider
      value={{ currentOrders, setCurrentOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('use Order error');
  }
  return context;
};

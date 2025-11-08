import { create } from 'zustand';

type CurrentOrderStoreType = {
  currentOrders2: any[];
  setCurrentOrders2: (orders: any) => void;
  addCurrentOrder: (new_order: any) => void;
  removeCurrentOrder: (current_order_id: any) => void;
};

export const useCurrentOrdersStore = create<CurrentOrderStoreType>(
  (set) => ({
    currentOrders2: [],
    setCurrentOrders2: (orders) => {
      set((state) => ({
        currentOrders2: orders
      }));
    },
    addCurrentOrder: (new_order) => {
      set((state) => ({
        currentOrders2: state &&
          state.currentOrders2 && [...state.currentOrders2, new_order]
      }));
    },
    removeCurrentOrder: (current_order_id) => {
      set((state) => ({
        currentOrders2: state.currentOrders2.filter(
          (i) => i.current_order_id !== current_order_id
        )
      }));
    }
  })
);

import { create } from 'zustand';

type userType = {
  user_id: string;
  name?: string;
  phone_number: string;
  email: string;
  national_id?: string;
  birth_date?: string;
  default_address_id?: string;
  country?: string;
  city?: string;
  
} | any;

type useUserStoreType = {
  user: userType;
  setUser: (user: userType) => void;
};

export const useUserStore = create<useUserStoreType>((set) => ({
  user: {},
  setUser: (_user) => {
    set((state) => ({
        user: _user
    }))
  }
}));

import { create } from "zustand";

const useProfileDetails = create((set) => ({
  profiledata: null,
  balance: 0,
  addProfileData: (data: any) =>
    set((state: any) => ({
      profiledata: data,
    })),
  removeProfileData: () => set({ profiledata: null }),
  setBalance: (data: any) =>
    set((state: any) => ({
      balance: data,
    })),
  removebalance: () => set({ balance: 0 }),
}));

export default useProfileDetails;

export const OrdersData = create((set) => ({
  ordersDeatils: null,
  activeStep: 1,
  addOrderDetails: (data: any) =>
    set((state: any) => ({
      ordersDeatils: { ...state.ordersDeatils, ...data },
    })),
  clearOrderDeatils: () => set({ ordersDeatils: null }),
  setActiveState: (data: any) =>
    set((state: any) => ({
      activeStep: data,
    })),
}));

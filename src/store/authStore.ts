import { userType } from "@/utils/getCurrentUser";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  authStatus: Boolean;
  user: null | userType;
  setUser: (user: userType) => void;
  logout: () => void;
}

// export const useAuthStore = create<AuthStore>((set) => ({
//   authStatus: false,
//   user: null,
//   setUser: (user) => {
//     set({ authStatus: true, user: user });
//   },
//   logout: () => {
//     set({ authStatus: false, user: null });
//   },
// }));

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authStatus: false,
      user: null,
      setUser: (user) => {
        set({ authStatus: true, user: user });
      },
      logout: () => {
        set({ authStatus: false, user: null });
      },
    }),
    {
      name: "auth",
    },
  ),
);

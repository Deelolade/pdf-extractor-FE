import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
    id: string;
  name: string;
  email: string;
  isPaidUser: boolean;
  plan: string;
  trialCount: number;

}

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    logOut: () => void;
};

export const useUser = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            logOut: () => set({ user: null })
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() =>
                (typeof window !== 'undefined' ? localStorage : undefined) as Storage
            ) ,
        }
    )
)


// export const useUser = create<UserStore>((set) => ({
//     user: null,
//     setUser: (user: User) => set({ user }),
//     logOut: () => set({ user: null })
// }))
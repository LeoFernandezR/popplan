import { create } from "zustand";

interface UserState {
  user: "Admin" | "Guest" | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface UserActions {
  setUser: (user: UserState["user"]) => void;
  logout: () => void;
  loginAsAdmin: () => void;
  loginAsGuest: () => void;
}

type UserStore = UserState & UserActions;

/**
 * Zustand store for managing user/auth state
 * This is optional and can be expanded when authentication is implemented
 */
export const useUserStore = create<UserStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  loading: false,

  // Actions
  setUser: (user: UserState["user"]) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
  loginAsAdmin: () => {
    set({
      user: "Admin",
      isAuthenticated: true,
    });
  },
  loginAsGuest: () => {
    set({
      user: "Guest",
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

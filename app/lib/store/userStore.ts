import { create } from 'zustand'
import type { User } from '@/app/lib/types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

interface UserActions {
  setUser: (user: User | null) => void
  logout: () => void
}

type UserStore = UserState & UserActions

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
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    })
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))


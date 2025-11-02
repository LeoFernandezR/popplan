export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface UserSession {
  user: User | null
  isAuthenticated: boolean
}


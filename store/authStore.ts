// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        // Demo credentials - replace with your API later
        if (username === 'admin' && password === 'admin123') {
          set({
            user: username,
            isAuthenticated: true,
          });
          return;
        }
        throw new Error('Invalid credentials');
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);


/*import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: async (username: string, password: string) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login Failed");

    const data = await res.json();

    set({ token: data.token, user: data });
    localStorage.setItem("token", data.token);
  },

  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem("token");
  },
}));*/



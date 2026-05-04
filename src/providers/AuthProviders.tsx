"use client";

import  { createContext, useState, useEffect, ReactNode, use } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define the shape of your User based on your Prisma backend
interface User {
    id: string;
    name: string;
    email: string;
}

// 2. Define what the Context will provide to the rest of the app
interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

// 3. Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Default to true to prevent hydration mismatch
    const router = useRouter();

    useEffect(() => {
        const hydrateAuth = () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Failed to parse user data from storage", error);
            } finally {
                // React 19 / Next.js Fix: Push the state update out of the synchronous render cycle
                setTimeout(() => setIsLoading(false), 0);
            }
        };

        hydrateAuth();
    }, []);

    const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        router.push('/login');
    };

    return (
        // React 19 Feature: We no longer need <AuthContext.Provider>
        <AuthContext value={{ user, token, isLoading, login, logout }}>
            {!isLoading && children}
        </AuthContext>
    );
};

// React 19 Feature: Using the new `use()` API instead of `useContext()`
export const useAuth = () => {
    const context = use(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
};
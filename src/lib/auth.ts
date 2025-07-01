"use client"

import secureLocalStorage from "react-secure-storage";

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    user: unknown;
    token: string;
    refreshToken?: string;
}

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store sensitive data securely
        secureLocalStorage.setItem("authToken", data.access_token);
        secureLocalStorage.setItem("user", JSON.stringify(data.user || null));
        
        if (data.refreshToken) {
            secureLocalStorage.setItem("refreshToken", data.refresh_token);
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Utility functions for auth management
export const getAuthToken = (): string | null => {
    return secureLocalStorage.getItem("authToken") as string | null;
};

export const getUser = (): unknown | null => {
    const user = secureLocalStorage.getItem("user") as string | null;
    return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
    secureLocalStorage.removeItem("authToken");
    secureLocalStorage.removeItem("refreshToken");
};

export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};
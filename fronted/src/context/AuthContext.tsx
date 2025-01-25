'use client'

import { User } from "@/interfaces/User";
import React, { createContext, useEffect, useState } from "react";


interface UserContextType {
    user: User;
    login: (token: string, name: string, email: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: { token: null, email: null, name: null },
    login: () => { },
    logout: () => { },
})  

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({
        token: null,
        name: null,
        email: null,
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('userToken')
        if (storedToken) {
            setUser(JSON.parse(storedToken))
        }
    }, [])
    
    // Save user data to localStorage whenever the user state changes
    useEffect(() => {
        if (user.token) {
            localStorage.setItem("userToken", JSON.stringify(user));
        } else {
            localStorage.removeItem("userToken");
        }
    }, [user]);

    // Login function
    const login = (token: string, name: string, email: string) => {
        console.log(token);
        console.log(name);
        console.log(email);
        
        setUser({ token, name, email });
    };
    // Logout function
    const logout = () => {
        setUser({ token: null, name: null, email: null });
        localStorage.removeItem("userToken");
    };
    return (
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
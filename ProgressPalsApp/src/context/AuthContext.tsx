// src/context/AuthContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

type LoginDetails = {
    UserIdentifier: string;
    Token: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    loginDetails: LoginDetails | null; // new state for login details
    setAuth: (value: boolean, details: LoginDetails | null) => void; // modify function signature to include details
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setAuthState] = useState(false);
    const [loginDetails, setLoginDetails] = useState<LoginDetails | null>(null);

    const setAuth = (value: boolean, details: LoginDetails | null) => {
        setAuthState(value);
        setLoginDetails(details);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuth, loginDetails, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
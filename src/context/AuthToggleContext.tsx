// AuthToggleContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context value
interface AuthToggleContextType {
    isAuthPopupOpen: boolean;
    toggleAuthPopup: () => void;
}

// Create a Context
const AuthToggleContext = createContext<AuthToggleContextType | undefined>(undefined);

// Define the type for the provider's children prop
interface AuthToggleProviderProps {
    children: ReactNode;
}

// Create a Provider component
export const AuthToggleProvider: React.FC<AuthToggleProviderProps> = ({ children }) => {
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState<boolean>(false);

    // Function to toggle the Auth popup state
    const toggleAuthPopup = () => setIsAuthPopupOpen(prev => !prev);

    return (
        <AuthToggleContext.Provider value={{ isAuthPopupOpen, toggleAuthPopup }}>
            {children}
        </AuthToggleContext.Provider>
    );
};

// Custom hook to use the AuthToggleContext
export const useAuthToggle = (): AuthToggleContextType => {
    const context = useContext(AuthToggleContext);
    if (!context) {
        throw new Error('useAuthToggle must be used within an AuthToggleProvider');
    }
    return context;
};

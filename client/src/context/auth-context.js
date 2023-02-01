import { createContext, useContext, useState } from "react";

const defaultProviderValues = {};

const AuthContext = createContext(defaultProviderValues);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [userRole, setUserRole] = useState("");

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, userRole, setUserRole }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useState } from "react";

interface AuthContextType {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
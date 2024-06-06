import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../services/auth/verifyToken";


export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        console.log(role)
        if (token && role) {
            verifyToken(token)
                .then((res) => {
                    if (res.errCodeCheckLogin === 1) {
                        setToken(null);
                        setUser(null);
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                    } else {
                        setUser(res.data.payload);
                        setToken(token);
                        console.log('user', user)
                    }
                })
                .catch((err) => {
                    setToken(null);
                });
        }
    }, []);

    const handleLoggedin = (token, user) => {
        //console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        setUser(user);
        setToken(token);
    };

    const handleLoggedOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        handleLoggedin,
        handleLoggedOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


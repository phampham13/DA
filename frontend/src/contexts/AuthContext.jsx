import { createContext, useEffect, useState } from "react";
import { verifyToken } from "../services/auth/verifyToken";
import { getDetailsUser } from "../services/UserService";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slides/userSlice";
import { updateCard } from "../redux/slides/borrowerCardSlice";
import { updateCart } from "../redux/slides/cartSlice";
import { toast } from "react-toastify";
import { getCard } from "../services/CardService";
import { getCart } from "../services/CartService";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
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
                    }
                })
                .catch((err) => {
                    setToken(null);
                });
        }
    }, []);

    const handleLoggedin = async (token, user) => {
        //console.log(user);
        localStorage.setItem("token", token)
        localStorage.setItem("role", user.role)
        setUser(user)
        setToken(token)
        const res = await getDetailsUser(user.id, token)
        if (res.status !== "OK") toast(res.message, { autoClose: 2000 })
        dispatch(updateUser({ ...res?.data, access_token: token }))
        if (user.role === 'user') {
            console.log(111111)
            const card = await getCard(user.id, token)
            dispatch(updateCard(card.data))
            console.log(card.data)
            const cart = await getCart(user.id, token)
            dispatch(updateCart(cart.data))
        }
    }

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


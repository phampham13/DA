import classNames from "classnames/bind";
import styles from "./Cart.module.scss"
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { getCart } from "../../../services/CartService";

const cx = classNames.bind(styles);
const Cart = () => {
    const { token, user } = useContext(AuthContext)
    console.log("user trong cart", user.id)

    useEffect(() => {
        if (user.id && token) {
            console.log("user trong cart", user.id)
            fetchA()
        }
    }, [user, token])

    const fetchA = async () => {
        const res = await getCart(user.id, token)
        console.log("cate", res)
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("Left")}>
                <p> Load cart</p>
            </div>
            <div className={cx("Right")}>
                <p>Met </p>
            </div>
        </div>
    )
}

export default Cart;
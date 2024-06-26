import classNames from "classnames/bind";
import styles from "./UserOrders.module.scss"

const cx = classNames.bind(styles);
const UserOrders = () => {
    return (
        <div className={cx("wrapper")}>
            Profile
        </div>
    )
}

export default UserOrders;
import classNames from "classnames/bind";
import styles from "./LibraryAddress.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
const LibraryAddress = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("Left")}>
                <span> <FontAwesomeIcon icon={faMapMarkerAlt} className={cx("icon")} />Địa chỉ: Số nhà 107 khu tập thể A5, ngách 27, ngõ 128C Đại La, Hà Nội</span>
            </div>
            <div className={cx("Right")}>
                <img src='../address.jpg'></img>
            </div>
        </div>
    )
}

export default LibraryAddress;
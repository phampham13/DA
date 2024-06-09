import React, { useEffect, useState, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./BorrowerCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { downQuantity, upQuantity, deleteBook, updateCard } from "../../../redux/slides/borrowerCardSlice";
import ModalBorrowerSlip from "./ModalBorrowerSlip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const cx = classNames.bind(styles);

const BorrowerCard = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listBook = useSelector((state) => state.borrowerCard.books);
    const total = useSelector((state) => state.borrowerCard.totalAmount);

    useEffect(() => {
        console.log(listBook);
    }, [listBook])

    const [showModal, setShowModal] = useState(false);

    const handleDeleteBook = (bookId) => {
        dispatch(deleteBook(bookId));
    }

    const handleUpQuantity = (bookId) => {
        dispatch(upQuantity(bookId));
    }

    const handleDownQuantity = (bookId) => {
        dispatch(downQuantity(bookId));
    }

    const handleShowModal = () => {
        if (total <= 5) {
            setShowModal(true);
        } else {
            toast.error("Không được mượn nhiều hơn 5 quyển");
        }
    };

    const handleOnclickEmpty = () => {
        navigate("/");
    };

    return (
        <div className={cx("wrapper")}>
            <h2>Thẻ đọc</h2>
            {listBook.length > 0 && token ? (
                <div>
                    <div className={cx("cardListBook")}>
                        {listBook.map((book, index) => (
                            <div key={book.bookId.name} className={cx("book")}>

                                <span onClick={() => handleDeleteBook(book.bookId._id, book.quantity)}>
                                    <FontAwesomeIcon icon={faClose} style={{ color: 'red', cursor: "pointer" }} />
                                </span>

                                <img src={book.bookId.coverImg} alt="#" />
                                <div className={cx("text")}>
                                    <p className={cx("id")}>
                                        {book.bookId.bookId}
                                    </p>
                                    <p className={cx("title")}>
                                        {book.bookId.name}
                                    </p>
                                </div>
                                <div className={cx("count")}>
                                    <p className={cx("control")} onClick={() => handleDownQuantity(book.bookId._id)}>
                                        -
                                    </p>
                                    <p>{book.quantity}</p>
                                    <p className={cx("control")} onClick={() => handleUpQuantity(book.bookId._id)}>
                                        +
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx("submit")}>
                        <p>
                            Tổng số sách trong thẻ đọc: <span>{total}</span>
                        </p>
                        <button onClick={handleShowModal}>Mượn sách</button>
                    </div>
                </div>
            ) : (
                <div className={cx("empty")}>
                    <div>
                        <img src="https://theme.hstatic.net/1000277297/1001091004/14/cart_empty_background.png?v=244" alt="empty cart" />
                    </div>
                    <h3>Bạn chưa thêm quyển sách nào vào giỏ hết</h3>
                    <p>Về trang "Tủ sách" để lựa sách nhé!!</p>
                    <button onClick={handleOnclickEmpty}>Quay lại trang chủ</button>
                </div>
            )}
            <ModalBorrowerSlip show={showModal} handleClose={() => setShowModal(false)} cardListBook={listBook} total={total} />
        </div>
    );
};

export default BorrowerCard;

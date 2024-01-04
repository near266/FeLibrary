import classNames from "classnames/bind";
import styles from "./BorrowerCard.module.scss"
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerCard } from "../../../features/borrowerCardSlice";
import ModalBorrowerSlip from "./ModalBorrowerSlip"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContex";

const cx = classNames.bind(styles);

const BorrowerCard = () => {
    const { user, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listBook = useSelector((state) => state.borrowerCard.listBook)
    const total = useSelector((state) => state.borrowerCard.count)

    const [showModal, setShowModal] = useState(false)
    let phoneNumber = ""
    if (1) {
        //phoneNumber = user.phoneNumber;
        useEffect(() => {
            dispatch(fetchBorrowerCard(phoneNumber))
        }, [])
    }

    const handleOnSubmit = (phoneNumber, bookId) => {
        dispatch(deleteBookAction(phoneNumber, productId));
    };

    const handleUpQuantity = async (phoneNumber, bookId, quantity) => {
        const res = await getOneBook(bookId);
        const quantityAvail = res.data[0].quantity;
        if (quantity < quantityAvail) dispatch(upBookAction(phoneNumber, bookId, quantity));
    };

    const handleDownQuantity = (phoneNumber, bookId, quantity) => {
        dispatch(downBookAction(phoneNumber, bookId, quantity));
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleOnclickEmpty = () => {
        navigate("/");
    };

    return (
        <div className={cx("wrapper")}>
            <h1>Thẻ đọc</h1>
            {/*{listBook.length > 0 && token ? (*/}
            {listBook.length > 0 && 1 ? (
                <div>
                    <div className={cx('cardListBook')}>
                        {listBook.map((book, index) => (
                            <div key={book.name} className={cx("book")}>
                                <span onClick={() => handleOnSubmit(phoneNumber, book.bookId, book.quantity)}>x</span>
                                <img src={book.cover} alt="#" />
                                <h4 className={cx('title')}>
                                    {book.name}
                                </h4>
                                <div className={cx("count")}>
                                    <p className={cx("control")} onClick={() => handleDownQuantity(phoneNumber, book.bookId, book.quantity)}>
                                        -
                                    </p>
                                    <p>{book.quantity}</p>
                                    <p className={cx("control")} onClick={() => handleUpQuantity(phoneNumber, book.bookId, book.quantity)}>
                                        +
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('submit')}>
                        <p>
                            Tổng số sách trong thẻ đọc <span>{total}</span>
                        </p>
                        <button onClick={handleShowModal}>Mượn sách</button>
                    </div>
                </div>
            ) : (
                <div className={cx('empty')}>
                    <div>
                        <img src="https://theme.hstatic.net/1000277297/1001091004/14/cart_empty_background.png?v=244" alt="test" />
                    </div>
                    <h3>Bạn chưa thêm quyến sách nào vào giỏ hết</h3>
                    <p>Về trang "Tủ sách" để lựa sách nhé!!</p>
                    <button onClick={() => handleOnclickEmpty()}>Quay lại trang chủ</button>
                </div>
            )}
            <ModalBorrowerSlip show={showModal} handleClose={() => setShowModal(false)} cartItems={listBook} total={total} user={user} />
        </div>
    )
}

export default BorrowerCard;
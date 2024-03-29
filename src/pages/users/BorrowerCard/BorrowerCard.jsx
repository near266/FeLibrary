import classNames from "classnames/bind";
import styles from "./BorrowerCard.module.scss"
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerCard, upBookQuantity, downBookQuantity, deleteBook } from "../../../features/borrowerCardSlice";
import ModalBorrowerSlip from "./ModalBorrowerSlip"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getBookById } from "../../../services/user/getBookById";
import axios from 'axios';


const cx = classNames.bind(styles);

const BorrowerCard = () => {
    //const { user, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const listBook = useSelector((state) => state.borrowerCard.listBook)
    const [total1, setTotal] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const [listBook, setbooks] = useState([]);



    const [showModal, setShowModal] = useState(false)
    let phoneNumber = "0123456789"
    if (1) {
        useEffect(async () => {
            const fetchData = async () => {
                try {


                    const response = await axios.get(`http://localhost:8085/api/v1/Cart/GetAllCardByUserId?userId=` + user.userId);
                    const book = await axios.get(`http://localhost:8085/api/v1/Cart/GetAllBookCardByUserId?userId=` + user.userId);
                    setbooks(book.data)
                    setTotal(response.data.total)
                    console.log(total1)
                    return () => { controller }

                } catch (error) {
                    console.log('Error:', error);
                }
            };

            fetchData();
        }, [])
    }

    const handleDeleteBook = (phoneNumber, bookId, quantityTotal) => {
        dispatch(deleteBook({ phoneNumber: phoneNumber, bookId: bookId, quantity: quantityTotal }));
    };

    const handleUpQuantity = async (phoneNumber, bookId, quantity) => {
        const book = await getBookById(bookId);
        const quantityAvail = 10; //book.quantityAvailabel
        if (quantity < quantityAvail) dispatch(upBookQuantity({ phoneNumber: phoneNumber, bookId: bookId, quantity: quantityTotal + 1 }));
        else toast.error("Không còn đủ sách")
    };

    const handleDownQuantity = (phoneNumber, bookId, quantity) => {
        if (quantity > 1) {
            dispatch(downBookQuantity({ phoneNumber: phoneNumber, bookId: bookId, quantity: quantity - 1 }));
        }
    };

    const handleShowModal = () => {
        if (total1 <= 5) {
            setShowModal(true);
        } else {
            toast.error("Không được mượn nhiều hơn 5 quyển")
        }
    };

    const handleOnclickEmpty = () => {
        navigate("/");
    };

    return (
        <div className={cx("wrapper")}>
            <h2>Thẻ đọc</h2>
            {/*{listBook.length > 0 && token ? (*/}
            {listBook.length > 0 && 1 ? (
                <div>
                    <div className={cx('cardListBook')}>
                        {listBook.map((book, index) => (
                            <div key={book.name} className={cx("book")}>
                                <span onClick={() => handleDeleteBook(phoneNumber, book.bookId, book.quantityTotal)}><FontAwesomeIcon icon={faClose} style={{ color: 'red', cursor: "pointer" }}></FontAwesomeIcon></span>
                                <img src={book.img} alt="#" />
                                <h4 className={cx('title')}>
                                    {book.name}
                                </h4>
                                <div className={cx("count")}>
                                    <p className={cx("control")} onClick={() => handleDownQuantity(phoneNumber, book.bookId, book.quantityTotal)}>
                                        -
                                    </p>
                                    <p>{book.quantityTotal}</p>
                                    <p className={cx("control")} onClick={() => handleUpQuantity(phoneNumber, book.bookId, book.quantityTotal)}>
                                        +
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('submit')}>
                        <p>
                            Tổng số sách trong thẻ đọc: <span>{total1}</span>
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
            <ModalBorrowerSlip show={showModal} handleClose={() => setShowModal(false)} cardListBook={listBook} total={total1} />
        </div>
    )
}

export default BorrowerCard;
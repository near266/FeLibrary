import { useSelector, useDispatch } from 'react-redux'
import classNames from "classnames/bind";
import styles from "./BookDetail.module.scss";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { selectBookById } from '../../../features/booksSlice';
import { fetchBooks } from '../../../features/booksSlice';
import { AuthContext } from "../../../contexts/AuthContex";

const cx = classNames.bind(styles);

export const BookDetail = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  //const { token, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  const book = useSelector(state => selectBookById(state, id))
  console.log(1, book)
  //const book = { bookId: 'NNA001', categoryName: 'Nguyễn Ngọc Ánh', author: 'Nguyễn Ngọc Ánh', name: 'Tôi thấy hoa vàng trên cỏ xanh', quantityTotal: 7, quantityAvailabel: 5, publisher: 'Kim Đồng', coverImg: 'https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg' }

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    if (count < book.quantityAvailabel) setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCard = () => {

    if (book.quantityAvailabel < 1) {
      toast.info('Đã hết sách, bạn vui lòng quay lại mượn sau !')
    }
    /*if (token && user && user.role === "user") {
      const phoneNumber = user.phoneNumber;
      dispatch(addBookToCard(phoneNumber, bookId, count));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng của bạn");
    } else {
      navigateTo("/login");
      toast.warn("Đăng nhập trước khi thêm vào giỏ hàng!!");
    }*/
    //const phoneNumber = '0123456789'
    //dispatch(bookAdded(phoneNumber, bookId, count))
    console.log('thêm giỏ thành công')
  };

  if (!book) {
    return (
      <section>
        <h2>Không tìm thấy thông tin sách!</h2>
      </section>
    )
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('book-detail')}>
        <div className={cx('divLeft')}>
          <img src={book.coverImg} alt="Bìa sách"></img>
        </div>
        <div className={cx('divRight')}>
          <h3 className={cx("name")}>{book.name}</h3>
          <p className={cx("author")}>Tác giả: {book.author}</p>
          <p className={cx("category")}>Thể loại: {book.categoryName}</p>
          <p style={{ marginBottom: '30px' }}>Nhà xuất bản: {book.publisher}</p>
          <p className={cx("total")}>Tổng số lượng: {book.quantityTotal}</p>
          <p className={cx("avail")}>Sẵn có để mượn :<span>{book.quantityAvailabel}</span></p>

          <div className={cx("count")}>
            <p className={cx("control")} onClick={decreaseCount}>
              -
            </p>
            <p>{count}</p>
            <p className={cx("control")} onClick={increaseCount}>
              +
            </p>
          </div>

          <div onClick={() => handleAddToCard()} className={cx("addCard")}>
            <p>Thêm vào thẻ đọc</p>
          </div>
        </div>
      </div>
    </div>
  )
}
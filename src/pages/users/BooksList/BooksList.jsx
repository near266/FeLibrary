import classNames from "classnames/bind";
import styles from "./BooksList.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchBooks, selectAllBooks, selectBookIds, selectBookById, searchBook } from "../../../features/booksSlice";

const cx = classNames.bind(styles);

const fakeCate = [
    {
        categoryId: 1,
        categoryName: 'Nguyễn Ngọc Ánh',
    },
    {
        categoryId: 2,
        categoryName: 'Kinh dị',
    },
    {
        categoryId: 3,
        categoryName: 'Lãng mạn',
    },
    {
        categoryId: 4,
        categoryName: 'Tiểu sử - hồi ký',
    },
    {
        categoryId: 5,
        categoryName: 'Tản văn',
    },
]

const BooksList = () => {
    const dispatch = useDispatch()

    const books = useSelector(selectAllBooks)
    const [originalProducts, setOriginalProducts] = useState(books);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [wordsToSearch, setWordsToSearch] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllCategory() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            //console.log(data);
        }
        getAllCategory();
        setCategories(fakeCate)
        console.log(categories)

    }, [])

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    function handleSearch(e) {
        const words = e.target.value
        if (words.trim()) {
            dispatch(searchBook(words))
            setWordsToSearch('')
        }
    }

    const redirectToOtherPage = (bookId) => {
        navigate(`/bookDetail/${bookId}`);
    };

    const renderedBooks = books.map(book => (
        <div className={cx('book')} key={book.bookId} onClick={() => redirectToOtherPage(book.bookId)}>
            <div className={cx('cover')}>
                <img src={book.coverImg} alt="Bìa sách"></img>
                <span>Mượn sách</span>
            </div>
            <div className={cx("info")}>
                <h5 className={cx('name')}>{book.name}</h5>
                <p>Tác giả: {book.author}</p>
                <p>Tổng số lượng: {book.quantityTotal}</p>
                <p>Sẵn có: <span>{book.quantityAvailabel}</span></p>
            </div>
        </div>
    ))

    return (
        <div className={cx('wrapper')}>
            <h3>Tủ sách của Dfree</h3>
            <div className={cx('search-bar')}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Tất cả loại</option>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryName}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm kiếm theo tên sách hoặc tác giả"
                />
                <button className={cx('search-button')} onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <div className={cx('book-container')}>{renderedBooks}</div>
        </div>
    )
}

export default BooksList
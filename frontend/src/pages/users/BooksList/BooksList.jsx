import classNames from "classnames/bind";
import styles from "./BooksList.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiBOOK } from "../../../services/Book/BookService";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks, selectAllBooks, selectBookIds, selectBookById, searchBook } from "../../../redux/slides/booksSlice";

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

    //const books = useSelector(selectAllBooks)
    const [books, setBooks] = useState([])
    const [originalBooks, setOriginalBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [keyword, setKeyword] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [request, setRequest] = useState({
        limit: 20,
        page: 0,
        sort: "quantityTotal",
    });
    useEffect(() => {
        getAll();
        fetchApi()
    }, []);
    const getAll = async () => {
        const res = await ApiBOOK.getAllBook(
            request.limit,
            request.page,
            request.sort
        );
        console.log(res);
        setData(res.data);
        setOriginalBooks(res.data)
        setBooks(res.data)
    };

    //useEffect(() => {
    //    fetchApi()
    //}, [])

    const fetchApi = async () => {
        const res = await axios.get("http://localhost:8017/bookCategories/getAll")
        const t = res.data.data
        console.log("tttttt", t)
        const cate = t.map(item => item.categoryName);
        console.log("cate", cate)
        setCategories(cate)
    }

    //const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
    //console.log('query', query)

    /*useEffect(() => {
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
    }, [dispatch])*/

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        const filteredBooks = originalBooks.filter(book => book.categoryName === selectedCategory)
        setBooks(filteredBooks)
    };

    const handleInputChange = (keyword) => {
        console.log(keyword)
    }

    function handleSearch(e) {
        if (keyword.trim()) {
            const booksByAuthor = originalBooks.filter(book => book.author.toLowerCase().includes(keyword.toLowerCase()));

            // Lọc sách có tên sách chứa từ khóa
            const booksByName = originalBooks.filter(book => book.name.toLowerCase().includes(keyword.toLowerCase()));

            // Kết hợp hai mảng kết quả
            const combinedBooks = [...booksByAuthor, ...booksByName];

            // Loại bỏ các sách trùng lặp trong mảng kết quả
            const uniqueBooks = combinedBooks.filter((book, index) =>
                combinedBooks.findIndex(b => b._id === book._id) === index
            );
            setBooks(uniqueBooks)
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
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className={cx('search-input')}
                    placeholder="Tìm kiếm theo tên sách hoặc tác giả"
                    onChange={e => setKeyword(e.target.value)}
                />
                <button className={cx('search-button')} onClick={handleSearch}>Tìm Kiếm</button>
            </div>
            <div className={cx('book-container')}>{renderedBooks}</div>
        </div>
    )
}

export default BooksList
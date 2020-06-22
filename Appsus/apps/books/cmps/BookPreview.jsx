import bookService from '../services/bookService.js'
const { Link } = ReactRouterDOM

export default function BookPreview(props) {
    const { book } = props

    var currnecy = bookService.getCurrnecyIcon(book.listPrice.currencyCode)

    return (
        <Link to={`/books/book/${book.id}/${book.title}`}>
        <article className="book-preview">
            <img src={book.thumbnail} alt="" />
            <p>Title: {book.title}</p>
            <p>Author: {book.authors[0]}</p>
            <p>Price: {currnecy}{book.listPrice.amount}</p>

        </article>
        </Link >
    )
}
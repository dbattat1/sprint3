
const { Link } = ReactRouterDOM

import bookService from "../services/bookService.js"

export default class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        const id = this.props.match.params.theBookId
        bookService.getById(id)
            .then(book => {
                this.setState({ book })
            })
    }
    render() {

        const { book } = this.state

        const Loading = <p>Loading...</p>

        return ((!book) ? Loading :
            <div className="book-details-page flex justify-center">
                <div className="book-details">
                    <img src={book.thumbnail} alt="" />
                    <p className="book-details-1st-p">Title: {book.title}</p>
                    <p>Author: {book.authors[0]}</p>
                    <p>Price: {book.listPrice.amount}</p>
                </div>
            </div>
        )
    }
}

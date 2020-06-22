import bookService from '../services/bookService.js'
import BookList from '../cmps/BookList.jsx'
import BookFilter from '../cmps/BookFilter.jsx'



export default class BookApp extends React.Component {

    state = {
        books: null,
        selectedBook: null,
        filterBy: null,
    }

    componentDidMount() { 
        this.loadBooks()
    }

    loadBooks = () => {  
        const books = bookService.query(this.state.filterBy)
        
        this.setState({ books })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {

        const { books, selectedBook } = this.state
        return (
            <section className="our-books flex column align-center">
                {<BookFilter onSetFilter={this.onSetFilter} />}
                {<BookList books={books}></BookList>}
            </section>
        )
    }
}
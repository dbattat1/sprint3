import BookPreview from '../cmps/BookPreview.jsx'


export default function BookList(props) {
    
    return (
        <div className="book-list">
            {props.books && props.books.map(book => <BookPreview onSelectBook={ props.onSelectBook } key={ book.id } book={ book } />) }
        </div>
    )
}
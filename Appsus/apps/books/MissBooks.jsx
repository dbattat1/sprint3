const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import bookService from './services/bookService.js'
import BookApp from './pages/BookApp.jsx';
import BookDetails from './pages/BookDetails.jsx';

export default class BookMain extends React.Component {
    
    constructor() {
        super()
        bookService.query()
    }

    render() {
        return (
            <Router>
                <main>
                    <Switch>
                        <Route component={BookDetails} path="/books/book/:theBookId/:theBookName" />
                        <Route component={BookApp} path="/" />
                    </Switch>
                </main>
            </Router>
        )
    }
}



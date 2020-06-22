const Router = ReactRouterDOM.HashRouter
const { Route, Switch, NavLink } = ReactRouterDOM
const history = History.createBrowserHistory()

import { NavBar } from './NavBar.jsx';
import { UserMsg } from './UserMsg.jsx';


// comment

import Emails from './apps/emails/pages/EmailApp.jsx';
import Keep from './apps/keep/pages/KeepApp.jsx';
import BookMain from './apps/books/MissBooks.jsx';
import Home from './pages/HomePage.jsx';



export class App extends React.Component {


    render() {
        return (
            <Router>
                <header className="appsus-header flex space-between align-center">
                    <NavLink exact to='/'><img alt="logo" src="./assets/img/logoNevo.png"></img></NavLink>
                    <NavBar history={history}></NavBar>
                </header>
                <main>
                    <Switch>
                        <Route component={Emails} path="/emails/filter/:filterBy" />
                        <Route component={Emails} path="/emails" />
                        <Route component={Keep} path="/keep" />
                        <Route component={BookMain} path="/books" />
                        <Route component={Home} path="/" />
                    </Switch>
                    <UserMsg></UserMsg>
                </main>
                {/* <footer>
                    copyrights 2020 &copy;
                </footer> */}
            </Router>
        )
    }
}




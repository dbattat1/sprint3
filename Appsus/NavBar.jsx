const { NavLink } = ReactRouterDOM


export function NavBar(props) {
    return <nav className="nav-bar flex">
        <ul className="main-nav-list clean-list flex space-evenly">
            
            <li><NavLink to='/emails' activeClassName="main-nav-active">Mister Email</NavLink></li>
            <li><NavLink exact to='/keep' activeClassName="main-nav-active">Miss Keep</NavLink></li>
            <li><NavLink exact to='/books' activeClassName="main-nav-active">Miss Books</NavLink></li>
        </ul>

    </nav>
}


const { Link, NavLink } = ReactRouterDOM

import emailService from "../services/emailService.js";

export function SideNav(props) {
    const numOfUnread = emailService.numOfUnread();
    return (
        <div className="side-nav flex column">
            <Link to="/emails/new" className="new-mail-btn">Compose <span>+</span></Link>
            <div className="tray-btn flex column">
                <NavLink to="/emails/" exact activeClassName='email-nav-active' className="">All mails</NavLink>
                <NavLink to="/emails/filter/inbox" activeClassName='email-nav-active' className="inbox-link">Inbox    <span>{(numOfUnread) ? '(' + numOfUnread.toString() + ')' : ''}</span></NavLink>
                <NavLink to="/emails/filter/unread" activeClassName='email-nav-active' className="">Unread</NavLink>
                <NavLink to="/emails/filter/starred" activeClassName='email-nav-active' className="">Starred</NavLink>
                <NavLink to="/emails/filter/trash" activeClassName='email-nav-active' className="">Trash</NavLink>
            </div>
        </div>
    )
}

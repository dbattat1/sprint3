import EmailPreview from './EmailPreview.jsx'



export function EmailList(props) {
    return (
        <React.Fragment>
            <div className="emails-inner-container flex column">
                <div className="emails-sort-btn flex" onClick={props.onSort}><i className="fas fa-sort"></i></div>

                <ul className="emails-list clean-list">
                    {props.emails.map((email, idx) =>
                        <EmailPreview key={idx} email={email} />)}
                </ul>
            </div>
        </React.Fragment>
    )
}

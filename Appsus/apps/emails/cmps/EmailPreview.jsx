const { Link } = ReactRouterDOM

export default function EmailPreview(props) {
    const { email } = props
    return (
        <Link to={`/emails/${email.id}`} >
            <li className={`${(!email.isRead) ? "unread-email" : "read-email"} flex space-between`}>
                <div className="email-list-sender">{email.sender}</div>
                <div className="email-list-content flex space-between">
                    <div className="preview-subject">{email.subject} - <span className="preview-body">{email.body}</span></div>
                    <div>{new Date(email.sentAt).toDateString()}</div>
                </div>
            </li>
        </Link>

    )

}

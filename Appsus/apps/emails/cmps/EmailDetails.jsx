import emailService from "../services/emailService.js";
import eventBus from '../../../services/eventBusService.js';

const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {
    state = {
        email: null
    }
    componentDidMount() {
        const id = this.props.match.params.emailId;
        emailService.getById(id)
            .then(email => {
                this.setState({ email })
            })
    }
    onRemoveEmail = () => {
        Swal.fire({
            title: 'Are you sure you want to delete this email?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.value) {
                emailService.remove(this.state.email.id)
                    .then(() => {
                        eventBus.emit('show-msg', { txt: 'Email deleted successfully!' })
                        this.props.history.push('/emails/')
                    })
                    .catch(err => {
                        alert('OOPs, try again');
                        console.log('ERR:', err);
                    })
            }
          })
    }
    onToggleStarEmail = () => {
        emailService.toggleStar(this.state.email.id)
            .then((email) => {
                this.setState({ email })
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);
            })
    }
    onToggleRead = () => {
        emailService.toggleRead(this.state.email.id)
            .then((email) => {
                if (email.isRead)
                    eventBus.emit('show-msg', { txt: 'Email marked as read successfully!' })
                else eventBus.emit('show-msg', { txt: 'Email marked as unread successfully!' })
                this.props.history.push('/emails/')
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);
            })
    }
    onToggleTrash = () => {
        emailService.toggleTrash(this.state.email.id)
            .then((email) => {
                if (email.isTrash)
                    eventBus.emit('show-msg', { txt: 'Email moved to trash successfully!' })
                else eventBus.emit('show-msg', { txt: 'Email moved to Inbox successfully!' })
                this.props.history.push('/emails/')
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);
            })
    }
    onReply = () => {
        this.props.history.push('/emails/new/' + this.state.email.id)
    }

    render() {
        const { email } = this.state;
        if (email) email.isRead = true;
        const Loading = <p>Loading...</p>
        return (
            (!email) ? Loading :
                <section className="email-details flex column">
                    <div className="email-details-wrapper flex column">
                        <div className="email-details-btns flex align-center">
                            <Link to="/emails/" title="Back"><i className="fas fa-chevron-left"></i></Link>
                            <a to="/emails/" onClick={this.onToggleTrash}>{(email.isTrash) ? <i className="fas fa-inbox" title="Move to Inbox"></i> : <i className="fas fa-trash-alt" title="Move to Trash"></i>}</a>
                            <a onClick={this.onToggleStarEmail} className={(email.isStarred) ? "starred" : ""} title={(email.isStarred) ? "unstar" : "star"}><i className="fas fa-star"></i></a>
                            <a onClick={this.onToggleRead} >Mark as unread</a>
                            {email.isTrash && <a onClick={this.onRemoveEmail} title="Delete permanently"><i className="fas fa-skull-crossbones"></i></a>}
                            <a onClick={this.onReply} title="Replay to email"><i className="fas fa-reply"></i></a>
                        </div>
                        <div className="email-details-main">
                            <h1>{email.subject}</h1>
                            <h2>{email.sender} &#60;<span>{email.senderAddress}</span>&gt;</h2>
                            <p>{email.body}</p>
                        </div>
                    </div>
                </section>
        )
    }
}

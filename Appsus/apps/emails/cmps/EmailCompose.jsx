import eventBus from '../../../services/eventBusService.js'
import emailService from '../services/emailService.js';

export class EmailCompose extends React.Component {
    state = {
        subject: '',
        address: '',
        body: '',
    }
    componentDidMount() {
        // In case of query string param - Note as email from the KeepApp
        const location = this.props.location.search.substring(1);
        if (location) {
            var params = location.split('&');
            var newEmailData = {};
            params.forEach(element => {
                var pair = element.split('=');
                pair[1] = pair[1].split('%20').join(' ')
                newEmailData[pair[0]] = pair[1];
            });
            this.setState({ subject: newEmailData.subject, address: newEmailData.address, body: newEmailData.body })
        }

        // In case of email id param - reply to email
        const id = this.props.match.params.emailId;
        if (id) {
            emailService.getById(id)
                .then(email => {
                    if (email) {
                        let { subject, body, senderAddress } = email;
                        let subjectReply = 'Re: ' + subject;
                        let bodyReply = body + '\n\n-----------------------------\n\n';
                        this.setState({ subject: subjectReply, address: senderAddress, body: bodyReply })
                    }
                })
        }
    }

    onAddEmail = (ev) => {
        ev.preventDefault();
        emailService.createEmail(this.state.subject, this.state.body, this.state.address)
        eventBus.emit('show-msg', { txt: 'Email sent!' })
        this.props.history.push('/emails/')
    }
    onInputChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        this.setState({ [name]: value })
    }
    render() {
        return <form className="add-email-form flex" onSubmit={this.onAddEmail}>
            <div className="add-email-container flex column">
                <input className="email-input-subject" autoComplete="off" placeholder="subject" onChange={this.onInputChange} value={this.state.subject} type="search" name="subject" id="" />
                <input className="email-input-address" autoComplete="off" placeholder="send to:" onChange={this.onInputChange} value={this.state.address} type="search" name="address" id="" />
                <textarea className="email-input-body" name="body" value={this.state.body} onChange={this.onInputChange} placeholder="Your text..." required></textarea>
                <button className="send-email-btn"><i className="fas fa-paper-plane"></i></button>
            </div>
        </form>
    }
}
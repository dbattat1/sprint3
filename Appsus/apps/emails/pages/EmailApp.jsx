import emailService from "../services/emailService.js";
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { SideNav } from "../cmps/SideNav.jsx"
import { SearchBox } from "../cmps/SearchBox.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch, NavLink } = ReactRouterDOM


export default class EmailApp extends React.Component {
    state = {
        emails: [],
        sort: true
    }
    componentDidMount() {
        this.loadEmails()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.filterBy !== this.props.match.params.filterBy) {
            this.loadEmails()
        }
    }
    loadEmails = () => {
        const filterBy = this.props.match.params.filterBy;
        emailService.query(filterBy)
            .then((emails) => {
                this.setState({ emails })
            })
    }
    onSort = () => {
        const { emails } = this.state;
        let sorted;
        if (this.state.sort) {
            sorted = emails.sort((a, b) => a.sentAt - b.sentAt);
        } else {
            sorted = emails.sort((a, b) => b.sentAt - a.sentAt);
        }
        this.setState({ emails: sorted });
        this.setState(prev => ({ sort: !prev.sort }));
    }
    onSetSearch = (txt) => {
        if (txt) {
            emailService.querySearch(txt)
                .then((filterEmails) =>
                    this.setState({ emails: filterEmails })
                )
        } else {
            this.loadEmails()
        }
    }
    render() {
        const { emails } = this.state;
        return (
            <Router>
                <SearchBox onSetSearch={this.onSetSearch} />
                <section className="email-container flex">
                    <SideNav />
                    <Switch>
                        <Route exact component={EmailCompose} path="/emails/new/:emailId" />
                        <Route exact component={EmailCompose} path="/emails/new" />
                        <Route exact component={EmailDetails} path="/emails/:emailId" />
                        <Route component={() => <EmailList onSort={this.onSort} emails={emails} />} path="/emails" />
                    </Switch>
                </section>
            </Router>
        )
    }
}
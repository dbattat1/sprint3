export class SearchBox extends React.Component {
    state = {
        txt: ''
    }
    handleChange = ({ target }) => {
        const name = target.name
        const value = target.value
        this.setState({ [name]: value }, () => {
            this.props.onSetSearch(this.state.txt)
        })
    }
    render() {
        return (
            <div className="email-search-box">
                <input type="search" name='txt' value={this.state.txt} onChange={this.handleChange} className="email-search-input" placeholder="Search here!" />
            </div>
        )
    }
}
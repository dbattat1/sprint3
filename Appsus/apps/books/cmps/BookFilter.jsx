export default class Filter extends React.Component {
    state = {
        filter: {
            bookName: '',
            maxPrice: '',
            minPrice: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }

    render() {
        const { bookName, maxPrice, minPrice } = this.state.filter
        return (
            <section className="filter flex space-between">
                <h1>Filter:</h1>
                <form onSubmit={this.onFilter} className="filter-form flex space-between">
                    <div>
                        <label htmlFor="">Book Name: </label>
                        <input type="text" name='bookName' value={bookName} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="">Min Price: </label>
                        <input type="number" name='minPrice' value={minPrice} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="">Max Price: </label>
                        <input type="number" name='maxPrice' value={maxPrice} onChange={this.handleChange} />
                    </div>
                    


                </form>
            </section>
        )
    }
}


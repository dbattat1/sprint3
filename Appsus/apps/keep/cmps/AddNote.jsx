
import services from '../services/keepService.js'
import makeId from '../../../services/utilService.js'
import eventBus from '../../../services/eventBusService.js';
import utils from '../../../services/utilService.js'

export default class AddNote extends React.Component {
    state = {
        type: 'txt',
        text: '',
        placeholder: 'Add a new note right here, friend'
    }

    componentDidMount() {

    }

    onInputChange = (ev) => {
        this.setState({ text: ev.target.value })
    }

    onAddNote = (ev) => {
        ev.preventDefault();
        if (!this.state.text) return;
        const info = this.setInfo()
        services.addNote(this.state.type, info)
            .then(this.props.loadNotes);
            eventBus.emit('show-msg', {txt: 'Yayy! New note!'})

        this.setState({ text: '' })
    }

    setInfo = () => {
        let info = {};
        switch (this.state.type) {
            case 'txt':
                info.title = this.state.text
                break;
            case 'img':
                info.url = this.state.text
            case 'video':
                info.url = this.state.text
                break;
            case 'maps':
                info.place = this.state.text
                break;
            case 'music':
                info.url = this.state.text
                break;
            case 'todo':
                info.todos = []
                this.state.text.split(',').map(txt => info.todos.push({ id: utils.makeId(), txt, isDone: false }))
                break;
            default:
                info.title = this.state.text
                break;
        }
        return info
    }

    onTypeChange = (ev) => {
        this.setState({ type: ev.target.value })
        switch (ev.target.value) {
            case 'txt':
                this.setState({ placeholder: 'Enter text', text: '' })
                break;
            case 'todo':
                this.setState({ placeholder: 'Type down your to-do\'s here. Separate, them, by, commas :)', text: '' })
                break;
            case 'img':
                this.setState({ placeholder: 'Enter image URL', text: '' })
                break;
            case 'video':
                this.setState({ placeholder: 'Enter video URL', text: '' })
                break;
            default:
                break;
        }
    }
    get types() {
        const { type } = this.state
        return <div className='types-container flex space-evenly'>
            <label htmlFor="txt" className={ (type === 'txt') ? 'active-type' : '' }>
                <i className="fas fa-text-height"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='txt' name='type' value='txt' />
            <label htmlFor="todo" className={ (type === 'todo') ? 'active-type' : '' }>
                <i className="fas fa-list-ul"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='todo' name='type' value='todo' />

            <label htmlFor="img" className={ (type === 'img') ? 'active-type' : '' }>
                <i className="fas fa-image"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='img' name='type' value='img' />
            <label htmlFor="video" className={ (type === 'video') ? 'active-type' : '' }>
                <i className="fas fa-video"></i></label>
            <input onChange={ this.onTypeChange } type='radio' id='video' name='type' value='video' />
        </div>
    }

    render() {
        return <form className="add-note-form flex justify-center" onSubmit={ this.onAddNote }>
            <div className="add-note-container flex column">
                <input autoComplete='off' placeholder={ this.state.placeholder } onChange={ this.onInputChange } value={ this.state.text } type="search" name="add-note" id="" />
                { this.types }
            </div>
        </form>
    }
}


import eventBus from './services/eventBusService.js'


export class UserMsg extends React.Component {
    state = {msg: null}
    
    componentDidMount() {
        this.unsubscribeFromEventBus = eventBus.on('show-msg', (msg)=>{
            this.setState({msg})
            setTimeout(()=>{
                this.setState({msg: null})
            }, 2500)
        })
    }
    render() {
        const {msg} = this.state
        return (!msg)? '' : <section className="user-msg">
            {msg.txt}
        </section>
    }
}
import utils from '../../../services/utilService.js'

export default class Note {
    constructor(type, info) {
        this.type = type
        this.id = utils.makeId()
        this.isPinned = false
        this.info = info
        this.style = {
            backgroundColor: '#eccc68',
            color: 'black'
        }
    }
}
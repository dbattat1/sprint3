
import KeepService from '../../services/keepService.js'


export default function TextNotePreview(props) {
    const { note } = props;
    const text = note.info.txt;
    const title = note.info.title;
    const background = note.style.backgroundColor;
    const fontColor = note.style.color;


    function handleChange(ev) {
        const field = (ev.target.id);
        const txt = (ev.target.innerText);
        KeepService.updateNoteById(note.id, {field, txt});
    }

  

    return (
        <div className="note text-note flex column space-between" style={{backgroundColor: background, color: fontColor}} >
            <i className="far fa-paper-plane" onClick={() => props.onSendAsEmail(note.id)} title="email this note"></i>
            <h2 contentEditable suppressContentEditableWarning={true} spellCheck="false" id="title" onBlur={handleChange}>{title}</h2>
            <p contentEditable suppressContentEditableWarning={true} spellCheck="false" id="txt" onBlur={handleChange}>{text}</p>

        </div>
    )
}
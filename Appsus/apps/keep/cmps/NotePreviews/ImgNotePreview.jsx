import KeepService from '../../services/keepService.js'

export default function ImgNotePreview(props) {
    const { note } = props;
    const title = note.info.title;
    const url = note.info.url;
    const background = note.style.backgroundColor;
    const fontColor = note.style.color;

    function handleChange(ev) {
        const field = (ev.target.id);
        const txt = (ev.target.innerText);
        KeepService.updateNoteById(note.id, {field, txt});
    }


    return (
        <div className="note img-note flex column space-between" style={{backgroundColor: background, color: fontColor}} >
            <img src={url}/>
            <h2 contentEditable suppressContentEditableWarning={true} spellCheck="false" id="title" onBlur={handleChange}>{title}</h2>
        </div>
    )
}


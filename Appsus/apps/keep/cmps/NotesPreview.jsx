
import TextNotePreview from './NotePreviews/TextNotePreview.jsx'
import TodoNotePreview from './NotePreviews/TodoNotePreview.jsx'
import ImgNotePreview from './NotePreviews/ImgNotePreview.jsx'
import VideoNotePreview from './NotePreviews/VideoNotePreview.jsx'

export default function NotesPreview(props) {
    const { note } = props;

    const NoteTools =
        <ul className="note-tools flex space-between clean-list">
            <li><i className="fas fa-map-pin" onClick={() => props.onToggleIsPinned(note.id)}></i></li>
            <li><i className="fas fa-palette">
                <input onChange={() => props.onChangeNoteColor(event, note.id)} id="backgroundColor" type="color" value="#1eb4e9" /></i></li>
            <li><i className="fas fa-font">
                <input onChange={() => props.onChangeFontColor(event, note.id)} id="color" type="color" value="#1eb4e9" /></i></li>
            <li><i className="fas fa-trash-alt" onClick={() => props.onRemoveNote(note.id)}></i></li>
            
        </ul>

    return (
        <div className="note-preview flex column">
            {note.type === "txt" && <TextNotePreview note={note} onSendAsEmail={props.onSendAsEmail} />}
            {note.type === "todo" && <TodoNotePreview note={note} onToggleIsDone={props.onToggleIsDone} />}
            {note.type === "img" && <ImgNotePreview note={note} />}
            {note.type === "video" && <VideoNotePreview note={note} />}
            {NoteTools}
        </div>
    );
};
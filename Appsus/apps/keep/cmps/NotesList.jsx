import NotesPreview from '../cmps/NotesPreview.jsx';

export default function NotesList(props) {
  
    return (
        <div className="notes-list flex wrap">
            {props.notes.map(note => <NotesPreview note={note} key={note.id} onSendAsEmail={props.onSendAsEmail} onChangeNoteColor={props.onChangeNoteColor} onChangeFontColor={props.onChangeFontColor} onToggleIsDone={props.onToggleIsDone} onRemoveNote={props.onRemoveNote} onToggleIsPinned={props.onToggleIsPinned}/>)}
        </div>
    )
}
import KeepService from '../../services/keepService.js'

export default function TodoNotePreview(props) {
    const { note } = props;
    const title = note.info.title;
    const todos = note.info.todos;
    const background = note.style.backgroundColor;
    const fontColor = note.style.color;

    function handleChange(ev) {
        const field = (ev.target.id);
        const txt = (ev.target.innerText);
        KeepService.updateNoteById(note.id, {field, txt});
    }

    

    return (
        <div className="note todo-note flex column space-between" style={{backgroundColor: background, color: fontColor}}>
            <h2 contentEditable suppressContentEditableWarning={true} spellCheck="false" id="title" onBlur={handleChange}>{title}</h2>
            <ul className="clean-list">
                {todos.map((todo, idx) => <li className={(!todo.isDone) ? "todo-not-done" : "todo-is-done"} onClick={() => props.onToggleIsDone(note.id, todo.id)} key={idx}><h3>{todo.txt}</h3></li>)}
            </ul>

        </div>
    )
}


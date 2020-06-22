import utils from '../../../services/utilService.js'
import Note from './noteModel.js'
import storageService from '../../../services/storageService.js'

export default {
    query,
    addNote,
    loadNotes,
    saveNotes,
    getNoteById,
    updateNoteById,
    removeNoteById,
    getPinnedNotes,
    toggleIsPinned,
    toggleTodoIsDone,
    getNoteInfoForSending,
    updateNoteStyleById

};

var gNotes = null;

function query() {
    if (!gNotes) {
        loadNotes()
    }
    saveNotes();
    return gNotes.filter(note => !note.isPinned);
}


function addNote(type, info) {
    gNotes = JSON.parse(JSON.stringify(gNotes))
    const newNote = new Note(type, info)
    gNotes.unshift(newNote)
    saveNotes()
    return Promise.resolve(newNote)
}

function loadNotes() {
    gNotes = storageService.loadFromStorage('notes', null)
    if (!gNotes || !gNotes.length) createTestNotes()
}

function saveNotes() {
    storageService.saveToStorage('notes', gNotes)
}

function getNoteById(noteId) {
    let noteById = gNotes.find(note => note.id === noteId)
    return Promise.resolve(...[noteById])
}

function getNoteIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId)
}

function updateNoteById(noteId, updates) {
    getNoteById(noteId).then(noteToUpdate => {
        noteToUpdate.info[updates.field] = updates.txt
        saveNotes();
    })
}

function updateNoteStyleById(noteId, updates) {
    getNoteById(noteId).then(noteToUpdate => {
        noteToUpdate.style[updates.field] = updates.colorVal
        saveNotes();
    })
    return Promise.resolve();
}

function removeNoteById(noteId) {
    let noteIdx = getNoteIdxById(noteId);
    gNotes.splice(noteIdx, 1);
}

function getPinnedNotes() {
    let pinnedNotes = gNotes.filter(note => note.isPinned);
    return pinnedNotes
}

function toggleIsPinned(noteId) {
    return getNoteById(noteId).then(noteToUpdate => {
        noteToUpdate.isPinned = !noteToUpdate.isPinned;
        saveNotes();
    })
}

function toggleTodoIsDone(noteId, todoId) {
    getNoteById(noteId).then(todoToUpdate =>
        todoToUpdate.info.todos.find(todo => todoId === todo.id).isDone = !todoToUpdate.info.todos.find(todo => todoId === todo.id).isDone)
    return Promise.resolve()
}

function getNoteInfoForSending(noteId) {
    return (getNoteById(noteId).then((note) => { return note }))
}

function createTestNotes() {
    gNotes = [{
            type: "txt",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "TEXT NOTE",
                txt: "so much wow"
            },
            style: {
                backgroundColor: "#d35400",
                color: "#ecf0f1",
            }
        },
        {
            type: "img",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "Hungry?",
                url: "https://i5.walmartimages.com/asr/209bb8a0-30ab-46be-b38d-58c2feb93e4a_1.1a15fb5bcbecbadd4a45822a11bf6257.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
            },
            style: {
                backgroundColor: "#e84393",
                color: "#ffeaa7",
            }
        },
        {
            type: "video",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "Here is a video:",
                url: "https://www.youtube.com/embed/npyz-qB01bM"
            },
            style: {
                backgroundColor: "#2f3640",
                color: "#f5f6fa",
            }
        },
        {
            type: "todo",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "TODO NOTE",
                todos: [
                    { id: '22QQS', txt: "Do things", isDone: true },
                    { id: '8UJ65', txt: "Do more", isDone: false },
                ]
            },
            style: {
                backgroundColor: "#e84118",
                color: "#f5f6fa",
            }
        },
        // ----------------------------------***********************--------------------------------------
        {
            type: "txt",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "Such a text note!",
                txt: "There comes a time in one\'s life when they have to look down at what they just did, and then wipe it off their ass"
            },
            style: {
                backgroundColor: "#9b59b6",
                color: "white",
            }
        },
        {
            type: "img",
            id: utils.makeId(),
            isPinned: false,
            info: {
                title: "Such an animal lover <3",
                url: "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/50277579_10218794633555812_5918837655444914176_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_oc=AQkY5TpxxCkfHiIplAuazeBmf9ZNPBtETU1NK0uhRBhEX76DpwQsfonwmF22D7g87Ds&_nc_ht=scontent.fsdv3-1.fna&oh=468f9848deef12d75b80065bad289fd9&oe=5ECD85B5"
            },
            style: {
                backgroundColor: "lightsalmon",
                color: "black",
            }
        },
        {
            type: "video",
            id: utils.makeId(),
            isPinned: true,
            info: {
                title: "chilllllax, watch trump\'s most awkward moments:",
                url: "https://www.youtube.com/watch?v=vlxmiFF85yU"
            },
            style: {
                backgroundColor: "#7f8c8d",
                color: "#f5f6fa",
            }
        },
        {
            type: "todo",
            id: utils.makeId(),
            isPinned: true,
            info: {
                title: "Shit to got DONE",
                todos: [
                    { id: '22QQS', txt: "FIND LOVE", isDone: false },
                    { id: '86565', txt: "GET RICH", isDone: false },
                    { id: '8KU65', txt: "KILL TIME ON TINDER", isDone: true },
                    { id: '10J65', txt: "TAKE OUT THE TRASH", isDone: true },
                    { id: 'YUI56', txt: "FIND SOMETHING TODO WITH THIS LIFE", isDone: false },
                ]
            },
            style: {
                backgroundColor: "#fed330",
                color: "#222f3e",
            }
        }
    ];
}

// function updateNoteById(noteId, updates) {

//     getNoteById(noteId).then(noteToUpdate => {
//         for (let field in updates) {
//             if (updates[field].todos) noteToUpdate[field].todos = updateTodos(noteToUpdate[field].todos, updates[field].todos)
//             else if (updates.style) noteToUpdate[field] = {...noteToUpdate[field], ...updates[field] }
//             else noteToUpdate[field] = updates[field];
//         }
//         gNotes = gNotes.map(note => (note.id === noteToUpdate.id) ? noteToUpdate : note)
//         saveNotes()
//     })
//     return Promise.resolve(true);
// }

// function updateTodos(todosToUpdate, updatedTodo) {
//     let newTodos = todosToUpdate.map(todo => (todo.id === updatedTodo.id) ? updatedTodo : todo)
//     return [...newTodos]
// }



// function deleteNote(noteId) {
//     let noteIdx = getNoteIdxById(noteId)
//     gNotes = JSON.parse(JSON.stringify(gNotes))
//     gNotes.splice(noteIdx, 1)
//     saveNotes()
//     return Promise.resolve(true)
// }




// function getNotesToRender(searchString) {

//     let filteredNotes;
//     loadNotes()

//     if (searchString) {
//         filteredNotes = searchNotes(searchString)
//         filteredNotes = sortPinned(filteredNotes)
//     } else gNotes = sortPinned(gNotes)

//     return Promise.resolve([...filteredNotes || gNotes])
// }

// function sortPinned(arrayToSort) {
//     return arrayToSort.slice().sort((note1, note2) => {
//         if (note1.isPinned && note2.isPinned) return 0
//         return note1.isPinned ? -1 : 1

//     })
// }

// function searchNotes(searchString) {
//     return gNotes.filter(note => {
//         if (note.title.toLowerCase().includes(searchString)) return true
//         if (note.type === 'txt') if (note.details.txt.toLowerCase().includes(searchString)) return true
//         if (note.type === 'todo') {
//             return note.details.todos.find(todo => todo.txt.toLowerCase().includes(searchString) !== -1)
//         }
//         return false
//     })
// }



// function togglePin(noteId) {
//     gNotes = JSON.parse(JSON.stringify(gNotes))
//     return getNoteById(noteId).then(noteToPin => {
//         noteToPin.isPinned = !noteToPin.isPinned
//         saveNotes();
//         return true;
//     })
// }

// function addTodo(noteId, todoTxt) {
//     getNoteById(noteId).then(noteToUpdate => {
//         noteToUpdate.details.todos.push({ id: getRandomId(), txt: todoTxt, isDone: false })
//         saveNotes()
//     })
//     return Promise.resolve(true)
// }
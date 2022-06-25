import * as uuid from "uuid";

export interface Note {
	id?: string,
	title?: string,
	description?: string,
}

interface NoteAction {
	type: "NOTE_ADD" | "NOTE_REMOVE" | "NOTE_EDIT",
	payload: Note,
}

// reuse generated uuids for debug sake
const InitialState:Note[] = [
	{id: "2613e584-d2ca-4fd1-a155-2271d7d26b4d", title: "Hello, World!", description: "this is my first note."},
	{id: "f7676bdf-0395-4403-b42f-ced2b6218e11", title: "oooo eee aaaa", description: "this is my second note."},
	{id: "b381c961-969e-4964-9fec-caa5ec21eec8", title: "oh no.", description: "this is my third note."},
]

export function noteReducer (state:Note[] = InitialState, action:NoteAction) {
	switch (action.type) {
		case "NOTE_ADD":
			return [
				...state,
				{
					...action.payload,
					id: uuid.v4(),
				}
			]
		case "NOTE_EDIT":
			return state.map(x => {
				if (x.id === action.payload.id) {
					return {
						...x,
						title: action.payload.title || x.title,
						description: action.payload.description || x.description,
					}
				} else return x;
			});
		case "NOTE_REMOVE":
			return state.filter(x => x.id !== action.payload.id);
		default:
			return state;
	}
}

export function addNote(title: string, description: string): NoteAction {
	return {
		type: "NOTE_ADD",
		payload: {
			title,
			description,
		}
	}
}

export function removeNote(id: string): NoteAction {
	return {
		type: "NOTE_REMOVE",
		payload: {
			id,
		}
	};
}

export function editNote(id: string, newTitle?: string, newDescription?: string): NoteAction{
	return {
		type: "NOTE_EDIT",
		payload: {
			id,
			title: newTitle,
			description: newDescription,
		}
	}
}

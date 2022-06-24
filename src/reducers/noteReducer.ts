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

const InitialState:Note[] = [
	{id: uuid.v4(), title: "Hello, World!", description: "this is my first note."},
	{id: uuid.v4(), title: "oooo eee aaaa", description: "this is my second note."},
	{id: uuid.v4(), title: "oh no.", description: "this is my third note."},
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

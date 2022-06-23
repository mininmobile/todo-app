import * as uuid from "uuid";

interface Note {
	id?: string,
	title?: string,
	description?: string,
}

interface NoteAction {
	type: "NOTE_ADD" | "NOTE_REMOVE" | "NOTE_EDIT",
	payload: Note,
}

const InitialState:Note[] = []

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
			return {
				...state,
				notes: state.filter(x => x.id !== action.payload.id),
			}
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
	}
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

import { Dispatch } from "@reduxjs/toolkit";
import * as uuid from "uuid";

export interface Note {
	id?: string,
	title?: string,
	description?: string,
}

interface NoteActionLoad {
	type: "NOTE_LOAD",
	payload: Note[],
}

interface NoteAction {
	type: "NOTE_ADD" | "NOTE_REMOVE" | "NOTE_EDIT",
	payload: Note,
}

// reuse generated uuids for debug sake
const InitialState:Note[] = []

export function noteReducer (state: Note[] = InitialState, action: NoteActionLoad | NoteAction) {
	switch (action.type) {
		case "NOTE_LOAD":
			return action.payload;
		case "NOTE_ADD":
			return [
				...state,
				action.payload
			]
		case "NOTE_REMOVE":
			return state.filter(x => x.id !== action.payload.id);
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
		default:
			return state;
	}
}

//
// actions
//

export async function fetchNotes(dispatch: Dispatch) {
	const response = await (await fetch("http://localhost:3001/notes")).json();
	dispatch({
		type: "NOTE_LOAD",
		payload: response,
	});
}


export async function addNote(dispatch: Dispatch, title: string, description: string) {
	const note = {
		id: uuid.v4(),
		title: title,
		description: description,
	}

	const response = await fetch("http://localhost:3001/notes", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});

	dispatch({
		type: "NOTE_ADD" + (response.ok ? "" : "_FAILED"),
		payload: note,
	});
}

export async function removeNote(dispatch: Dispatch, id: string) {
	const response = await fetch("http://localhost:3001/notes/" + id, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});

	dispatch({
		type: "NOTE_REMOVE" + (response.ok ? "" : "_FAILED"),
		payload: { id },
	});
}

export async function editNote(dispatch: Dispatch, id: string, title?: string, description?: string) {
	const note = { id, title, description };

	const response = await fetch("http://localhost:3001/notes/" + id, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});

	dispatch({
		type: "NOTE_EDIT" + (response.ok ? "" : "_FAILED"),
		payload: note,
	});
}

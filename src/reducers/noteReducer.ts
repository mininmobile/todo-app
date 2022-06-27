import { Dispatch } from "@reduxjs/toolkit";
import * as uuid from "uuid";

export interface Note {
	id?: string,
	title?: string,
	description?: string,
	tags?: Array<string>,
}

interface NoteActionLoad {
	type: "NOTE_LOAD",
	payload: Note[],
}

interface NoteActionTag {
	type: "NOTE_TAG" | "NOTE_UNTAG",
	payload: {
		id: string,
		tagId: string,
	},
}

interface NoteAction {
	type: "NOTE_ADD" | "NOTE_REMOVE" | "NOTE_EDIT",
	payload: Note,
}

const InitialState:Note[] = []

export function noteReducer (state: Note[] = InitialState, action: NoteActionLoad | NoteActionTag | NoteAction) {
	switch (action.type) {
		// NoteActionLoad handlers
		case "NOTE_LOAD":
			return action.payload;
		// NoteActionTag handlers
		case "NOTE_TAG":
			return state.map(x => {
				if (x.id === action.payload.id) {
					return {
						...x,
						tags: [ ...x.tags!, action.payload.tagId ]
							.filter((t, i, arr) => arr.indexOf(t) === i),
					}
				} else return x;
			});
		case "NOTE_UNTAG":
			return state.map(x => {
				if (x.id === action.payload.id) {
					return {
						...x,
						tags: x.tags!.filter(x => x !== action.payload.tagId),
					}
				} else return x;
			});
		// NoteAction handlers
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
						tags: action.payload.tags || x.tags,
					}
				} else return x;
			});

		default: return state;
	}
}

//
// actions
//

export async function fetchNotes(dispatch: Dispatch) {
	const response = await fetch("http://localhost:3001/notes");
	const json = await response.json();
	dispatch({
		type: "NOTE_LOAD" + (response.ok ? "" : "_FAILED"),
		payload: json,
	});
}

export async function tagNote(dispatch: Dispatch, id:string, tagId: string) {
	const response = await fetch("http://localhost:3001/notes/" + id + "/tags", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: tagId,
	});

	dispatch({
		type: "NOTE_TAG" + (response.ok ? "" : "_FAILED"),
		payload: { id, tagId },
	});
}

export async function untagNote(dispatch: Dispatch, id:string, tagId: string) {
	const response = await fetch("http://localhost:3001/notes/" + id + "/tags", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: tagId,
	});

	dispatch({
		type: "NOTE_UNTAG" + (response.ok ? "" : "_FAILED"),
		payload: { id, tagId },
	});
}

export async function addNote(dispatch: Dispatch, title: string, description: string) {
	const note = {
		id: uuid.v4(),
		title,
		description,
		tags: [],
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

export async function editNote(dispatch: Dispatch, id: string, title: string, description: string, tags: string[]) {
	const note = { id, title, description, tags };

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

import { Dispatch } from "@reduxjs/toolkit";
import * as uuid from "uuid";
import { Note, untagAllNotes } from "./noteReducer";

// all fields are optional just for developer convenience, usually they would all be defined
export interface Tag {
	id?: string,
	title?: string,
	color?: string,
}

interface TagActionLoad {
	type: "TAG_LOAD",
	payload: Tag[],
}

interface TagAction {
	type: "TAG_ADD" | "TAG_REMOVE" | "TAG_EDIT",
	payload: Tag,
}

const InitialState: Tag[] = []

export function tagsReducer(state = InitialState, action: TagActionLoad | TagAction): Tag[] {
	switch (action.type) {
		// TagActionLoad handlers
		case "TAG_LOAD":
			return action.payload;
		// TagAction handlers
		case "TAG_ADD":
			return [
				...state,
				action.payload,
			]
		case "TAG_REMOVE":
			return state.filter(x => x.id !== action.payload.id);
		case "TAG_EDIT":
			return state.map(x => {
				if (x.id === action.payload.id) {
					return {
						...x,
						title: action.payload.title || x.title,
						color: action.payload.color || x.color,
					}
				} else return x;
			});

		default: return state;
	}
}

//
// actions
//

export async function fetchTags(dispatch: Dispatch) {
	const response = await fetch("http://localhost:3001/tags");
	const json = await response.json();

	dispatch({
		type: "TAG_LOAD" + (response.ok ? "" : "_FAILED"),
		payload: json,
	});
}

export async function addTag(dispatch: Dispatch, title: string, color: string) {
	const tag = {
		id: uuid.v4(),
		title,
		color,
	}

	const response = await fetch("http://localhost:3001/tags", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(tag),
	});

	dispatch({
		type: "TAG_ADD" + (response.ok ? "" : "_FAILED"),
		payload: tag,
	});
}

export async function removeTag(dispatch: Dispatch, id: string, notesState: Note[]) {
	const response = await fetch("http://localhost:3001/tags/" + id, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});

	dispatch({
		type: "TAG_REMOVE" + (response.ok ? "" : "_FAILED"),
		payload: { id },
	});

	// if the tag is successfully deleted from the database then remove it from all notes that are tagged with it
	if (response.ok)
		untagAllNotes(dispatch, notesState, id);
}

export async function editTag(dispatch: Dispatch, id: string, title: string, color: string) {
	const tag = { id, title, color };

	const response = await fetch("http://localhost:3001/tags/" + id, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(tag),
	});

	dispatch({
		type: "TAG_EDIT" + (response.ok ? "" : "_FAILED"),
		payload: tag,
	});
}

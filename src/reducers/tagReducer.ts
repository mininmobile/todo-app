import { Dispatch } from "@reduxjs/toolkit";
import * as uuid from "uuid";

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

export function noteReducer(state = InitialState, action: TagActionLoad | TagAction): Tag[] {
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
	const response = await (await fetch("http://localhost:3001/tags")).json();
	dispatch({
		type: "TAG_LOAD" + (response.ok ? "" : "_FAILED"),
		payload: response,
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

export async function removeTag(dispatch: Dispatch, id: string) {
	const response = await fetch("http://localhost:3001/tags/" + id, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	});

	dispatch({
		type: "TAG_REMOVE" + (response.ok ? "" : "_FAILED"),
		payload: { id },
	});
}

export async function editTag(dispatch: Dispatch, id: string, title?: string, color?: string) {
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

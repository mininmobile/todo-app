import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./reducers/noteReducer";
import { tagsReducer } from "./reducers/tagReducer";

export const store = configureStore({
	reducer: combineReducers({
		notes: noteReducer,
		tags: tagsReducer,
	}),
});

export type RootState = ReturnType<typeof store.getState>;

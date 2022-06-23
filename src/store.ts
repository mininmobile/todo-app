import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./reducers/noteReducer";

export default configureStore({
	reducer: noteReducer,
});

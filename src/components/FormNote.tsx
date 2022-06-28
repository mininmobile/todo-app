import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { addNote, editNote, Note } from "../reducers/noteReducer";

interface FormNoteProps {
	type: "NEW" | "EDIT",
	onClose?: () => void, // close dialog, passed when initialized as element of dialog
}

const FormNote: React.FC<FormNoteProps> = ({ type, onClose }) => {
	const notes = useSelector<RootState, Note[]>(state => state.notes);
	const dispatch = useDispatch();

	let [title, setTitle] = useState("");
	let [description, setDescription] = useState("");

	const { id } = useParams();
	useEffect(() => {
		if (type === "EDIT" && id) {
			let note = notes.find(x => x.id === id);
			if (note) {
				setTitle(note.title ?? "");
				setDescription(note.description ?? "");
			}
		}
	}, [notes, id, type]);

	const onNewAction = useCallback((title: string, description: string) =>
		addNote(dispatch, title, description), [dispatch]);

	const onEditAction = useCallback((id: string, title: string, description: string,) =>
		editNote(dispatch, id, title, description), [dispatch]);

	const handleSubmit = useCallback(() => {
		if (title.length === 0 || description.length === 0)
			return;

		if (type === "EDIT" && id && notes.find(x => x.id! === id!))
			onEditAction(id, title, description)
		else
			onNewAction(title, description);

		onClose!();
	}, [onEditAction, onNewAction, onClose, type, notes, id, title, description]);

	// allow ctrl+enter for submitting the form
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "Enter")
				handleSubmit();
		}

		document.addEventListener("keydown", listener);
		return () => document.removeEventListener("keydown", listener);
	}, [handleSubmit]);

	return (
		<>
			<input className="form__input form__input-title" placeholder="Title" value={title ?? ""}
				onChange={(e) => setTitle(e.currentTarget.value)}/>
			<textarea className="form__input form__textarea" placeholder="Description" value={description ?? ""}
				onChange={(e) => setDescription(e.currentTarget.value)} />

			<div className="form__button-list">
				<div className="form__input form__button" onClick={onClose!}>Cancel</div>
				<div className="form__input form__button form__button-highlighted" onClick={handleSubmit}>
					{type === "NEW" ? "Add Note" : "Save Changes"}</div>
			</div>
		</>
	);
}

export default FormNote;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addNote, editNote, Note } from "../reducers/noteReducer";

interface FormNoteProps {
	type: "NEW" | "EDIT",
	// close dialog, passed when initialized as element of dialog
	onClose?: () => void,
}

const FormNote: React.FC<FormNoteProps> = ({ type, onClose }) => {
	const notes = useSelector<Note[], Note[]>(state => state);
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

	const onNewAction = (title: string, description: string) => {
		dispatch(addNote(title, description));
	}

	const onEditAction = (id: string, title: string, description: string) => {
		dispatch(editNote(id, title, description));
	}

	const handleSubmit = () => {
		if (type === "EDIT" && id && notes.find(x => x.id === id))
			onEditAction(id, title, description)
		else
			onNewAction(title, description);

		onClose!();
	}

	return (
		<>
			<input className="form__text" placeholder="Title" value={title ?? ""}
				onChange={(e) => setTitle(e.currentTarget.value)}/>
			<textarea className="form__textarea" placeholder="Description" value={description ?? ""}
				onChange={(e) => setDescription(e.currentTarget.value)} />

			<div className="form__button" onClick={onClose!}>Cancel</div>
			<div className="form__button" onClick={handleSubmit}>{type === "NEW" ? "Add Note" : "Save Changes"}</div>
		</>
	)
}

export default FormNote;

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NoteBarProps {
	newNoteAction: (title: string, description: string) => {},
}

const defaultState = {
	open: false,
	title: "",
	description: "",
}

/**
 * a note-like box that expands when clicked to give a WYSIWYG-like creation experience of a note
 *
 * on expansion user is navigated to `/new`, on cancel/submission user is navigated back to `/`
 */
const NoteBar: React.FC<NoteBarProps> = ({ newNoteAction }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [state, setState] = useState(defaultState);

	// if location is changed away from `/new` reset state
	useEffect(() => {
		setState(location.pathname !== "/new" ? defaultState
			: { ...defaultState, open: true });
	}, [location]);

	const handleFocus = () => {
		if (!state.open) {
			if (location.pathname !== "/new")
				navigate("/new");
		}
	}

	const handleCancel = useCallback(() => {
		setState(defaultState);
		if (window.location.pathname === "/new")
			navigate("/");
	}, [setState, navigate]);

	const handleSubmit = useCallback(() => {
		if (state.title.length === 0 || state.description.length === 0)
			return;

		newNoteAction(state.title, state.description);
		handleCancel(); // or rather, handle close in this case
	}, [state, newNoteAction, handleCancel]);

	// allow submit via. ctrl+enter
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "Enter")
				handleSubmit();
		}

		if (state.open)
			document.addEventListener("keydown", listener);
		return () => document.removeEventListener("keydown", listener);
	}, [handleSubmit, state.open]);

	return (
		<div className={"note-bar " + (state.open ? "active" : "")}>
			<input className="note-bar__input-title" type="text" placeholder="Title"
				value={state.open ? state.title : "Take a note..."}
				onChange={(e) => setState({ ...state, title: e.currentTarget.value })}
				onFocus={handleFocus} />
			<textarea className="note-bar__input-description" placeholder="Description"
				value={state.description}
				onChange={(e) => setState({ ...state, description: e.currentTarget.value })} />

			<div className="note-bar__buttons form__button-list">
				<div className="form__input form__button" onClick={handleCancel}>Cancel</div>
				<div className="form__input form__button form__button-highlighted" onClick={handleSubmit}>Add Note</div>
			</div>
		</div>
	);
}

export default NoteBar;

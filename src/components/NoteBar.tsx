import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface NoteBarProps {
	newNoteAction: (title: string, description: string) => {},
}

const defaultState = {
	open: false,
	title: "",
	description: "",
}

const NoteBar: React.FC<NoteBarProps> = ({ newNoteAction }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [state, setState] = useState(defaultState);

	useEffect(() => {
		setState(location.pathname !== "/new" ?
			defaultState : { ...defaultState, open: true });
	}, [location]);

	const handleFocus = () => {
		if (!state.open) {
			if (location.pathname !== "/new")
				navigate("/new");
		}
	}

	const handleCancel = () => {
		setState(defaultState);
		if (window.location.pathname === "/new")
			navigate("/");
	}

	const handleSubmit = () => {
		newNoteAction(state.title, state.description);
		handleCancel(); // or rather, handle close in this case
	}

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

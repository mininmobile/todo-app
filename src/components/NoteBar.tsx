import "./NoteBar.css";
import { Link } from "react-router-dom";

const NoteBar:React.FC = () => {
	return (
		<div className="note-bar">
			<div className="note-bar__text">Take Note</div>
			<div className="note-bar__buttons">
				<Link to="/new" className="note-bar__button note-bar__new-note">+</Link>
			</div>
		</div>
	)
}

export default NoteBar;

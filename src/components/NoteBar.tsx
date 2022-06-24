import "./NoteBar.css";
import { Link } from "react-router-dom";

const NoteBar:React.FC = () => {
	return (
		<div className="note-bar">
			<div className="note-bar__text">Take Note</div>
			<div className="note-bar__buttons">
				<div className="note-bar__new-note">
					<Link to="/new">+</Link>
				</div>
			</div>
		</div>
	)
}

export default NoteBar;

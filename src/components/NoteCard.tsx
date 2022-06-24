import { Link } from "react-router-dom";
import "./NoteCard.css";

interface NoteCardProps {
	id: string,
	title: string,
	description: string,
	deleteAction: () => void,
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, description, deleteAction }) => {
	return (
		<div className="note-card">
			<div className="note-card__title">{title}</div>
			<div className="note-card__description">{description}</div>
			<div className="note-card__actions">
				<a className="note-card__actions-delete" onClick={deleteAction}>Delete</a>
				<Link className="note-card__actions-edit" to={`/edit/${id}`}>Edit</Link>
			</div>
		</div>
	)
}

export default NoteCard;

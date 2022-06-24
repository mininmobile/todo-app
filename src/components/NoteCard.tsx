import "./NoteCard.css";
import { Note } from "../reducers/noteReducer";

interface NoteCardProps {
	description: string,
	title: string,
	deleteAction: () => void,
}

const NoteCard: React.FC<NoteCardProps> = ({ description, title, deleteAction }) => {
	return (
		<div className="note-card">
			<div className="note-card__title">{title}</div>
			<div className="note-card__description">{description}</div>
			<div className="note-card__actions">
				<div className="note-card__actions-delete" onClick={deleteAction}>X</div>
			</div>
		</div>
	)
}

export default NoteCard;

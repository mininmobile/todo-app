import { NavigateFunction } from "react-router-dom";
import "./NoteCard.css";
import { MenuButton, MenuDropdownProps } from "./Menu";

interface NoteCardProps {
	id: string,
	title: string,
	description: string,
	deleteAction: () => void,
	navigateAction: NavigateFunction,
	setContextMenuState: React.Dispatch<React.SetStateAction<MenuDropdownProps>>,
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, description, deleteAction, navigateAction, setContextMenuState }) => {
	return (
		<div className="note-card">
			<div className="note-card__title">{title}</div>
			<div className="note-card__description">{description}</div>
			<div className="note-card__actions">
				<MenuButton setContextMenuState={setContextMenuState} menu={[
					["Edit", () => navigateAction(`/edit/${id}`)],
					["Delete", deleteAction],
				]}/>
			</div>
		</div>
	)
}

export default NoteCard;

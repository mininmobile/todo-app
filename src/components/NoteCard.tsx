import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../store";
import { Tag } from "../reducers/tagReducer";
import SearchContext from "../contexts/SearchContext";
import { MenuButton, MenuDropdownProps } from "./Menu";

interface NoteCardProps {
	id: string,
	title: string,
	description: string,
	tagIds: string[],
	deleteAction: () => void,
	navigateAction: NavigateFunction,
	setContextMenuState: React.Dispatch<React.SetStateAction<MenuDropdownProps>>,
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, description, tagIds, deleteAction, navigateAction, setContextMenuState }) => {
	const { searchQuery, setSearchQuery } = useContext(SearchContext);
	const tags = useSelector<RootState, Tag[]>(state => state.tags);

	const tagsFiltered = useMemo(() =>
		tags.filter(tag => tagIds.includes(tag.id!)), [tags, tagIds]);

	const handleClickTag = (tagId: string) => {
		if (!searchQuery.tags.includes(tagId))
			setSearchQuery({ ...searchQuery, tags: [ ...searchQuery.tags, tagId ] })
	}

	return (
		<div className="note-card">
			<div className="note-card__title">{title}</div>
			<div className="note-card__description">{description}</div>
			<div className="note-card__actions">
				<div className="note-card__tags">
					{tagsFiltered.map(tag =>
						<div key={tag.id} className="note-card__tag"
						onClick={() => handleClickTag(tag.id!)}
						style={{ background: "#" + tag.color }}>{tag.title}</div>)}
				</div>
				<MenuButton setContextMenuState={setContextMenuState} menu={[
					["Edit", () => navigateAction(`/edit/${id}`)],
					"-",
					["Delete", deleteAction],
				]}/>
			</div>
		</div>
	);
}

export default NoteCard;

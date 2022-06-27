import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../store";
import { Tag } from "../reducers/tagReducer";
import { removeNote, tagNote, untagNote } from "../reducers/noteReducer";
import SearchContext from "../contexts/SearchContext";
import { MenuButton, MenuDropdownProps } from "./Menu";

interface NoteCardProps {
	id: string,
	title: string,
	description: string,
	tagIds: string[],
	navigateAction: NavigateFunction,
	setContextMenuState: React.Dispatch<React.SetStateAction<MenuDropdownProps>>,
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, description, tagIds, navigateAction, setContextMenuState }) => {
	const { searchQuery, setSearchQuery } = useContext(SearchContext);
	const tags = useSelector<RootState, Tag[]>(state => state.tags);
	const dispatch = useDispatch();

	const tagsFiltered = useMemo(() =>
		tags.filter(tag => tagIds.includes(tag.id!)), [tags, tagIds]);
	const tagsFilteredInvert = useMemo(() =>
		tags.filter(tag => !tagIds.includes(tag.id!)), [tags, tagIds]);

	const handleDelete = (id: string) =>
		removeNote(dispatch, id);

	const handleTagNote = (noteId: string, tagIds: string[], tagId: string) =>
		tagNote(dispatch, noteId, tagIds, tagId);

	const handleUntagNote = (noteId: string, tagIds: string[], tagId: string) =>
		untagNote(dispatch, noteId, tagIds, tagId);

	const handleClickTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, tagId: string) => {
		if (e.currentTarget === e.target && !searchQuery.tags.includes(tagId))
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
						onClick={(e) => handleClickTag(e, tag.id!)}
						style={{ background: "#" + tag.color }}>
							{tag.title}
							<div className="note-card__tag__remove"
								onClick={() => handleUntagNote(id, tagIds, tag.id!)}>x</div>
						</div>)}

					<MenuButton setContextMenuState={setContextMenuState}
						className="note-card__tags-add" righty={true} menu={
						tagsFilteredInvert.map(tag =>
							[<>
								<div className="menu-dropdown__item__color"
									style={{ background: "#" + tag.color }} />
								{tag.title!.charAt(0).toUpperCase() + tag.title!.substring(1)}
							</>, () => handleTagNote(id, tagIds, tag.id!)])
					}>+</MenuButton>
				</div>

				<MenuButton setContextMenuState={setContextMenuState} menu={[
					["Edit", () => navigateAction(`/edit/${id}`)],
					"-",
					["Delete", () => handleDelete(id)],
				]} />
			</div>
		</div>
	);
}

export default NoteCard;

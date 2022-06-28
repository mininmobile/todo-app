import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addTag, editTag, fetchTags, removeTag, Tag } from "../reducers/tagReducer";
import TagListItem from "../components/TagListItem";
import { fetchNotes, Note } from "../reducers/noteReducer";

/**
 * provides a view of all tags in the database, its structure is commented on in the README
 *
 * allows the user to manage tags through `TagListItem`s
 */
const TagManager: React.FC = () => {
	const notes = useSelector<RootState, Note[]>(state => state.notes); // only required for handleRemoveAction
	const tags = useSelector<RootState, Tag[]>(state => state.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNotes(dispatch); // only required for handleRemoveAction
		fetchTags(dispatch);
	}, [dispatch]);

	const handleAddAction = (title: string, color: string) => {
		addTag(dispatch, title, color);
	}

	const handleEditAction = (id: string, title: string, color: string) => {
		editTag(dispatch, id, title, color);
	}

	const handleRemoveAction = (id: string) => {
		removeTag(dispatch, id, notes);
	}

	return (
		<>
			<h1>Tag Manager</h1>
			<p><b>To add a tag</b> enter in a <b>title</b> and <b>hexadecimal color</b> in the top bar, and click <i>Add</i>.</p>
			<p><b>To edit a tag</b> click its <b>title</b> or <b>color</b> and type, save your changes by clicking <i>Edit</i> or revert to the tag's original title/color (before you started editing it) by clicking <i>Cancel</i>.</p>
			<p><b>To remove a tag</b> click its <i>Remove</i> button on the right.</p>

			{/* header of "table" */}
			<TagListItem isBar={true} addTagAction={handleAddAction} />
			{/* contents of "table" */}
			{tags.map(tag =>
				<TagListItem key={tag.id} tag={tag}
					editTagAction={handleEditAction}
					removeTagAction={handleRemoveAction} />)}
		</>
	);
}

export default TagManager;

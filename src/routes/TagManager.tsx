import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addTag, editTag, fetchTags, removeTag, Tag } from "../reducers/tagReducer";
import TagListItem from "../components/TagListItem";

const TagManager: React.FC = () => {
	const tags = useSelector<RootState, Tag[]>(state => state.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchTags(dispatch);
	}, [dispatch]);

	const handleAddAction = (title: string, color: string) => {
		addTag(dispatch, title, color);
	}

	const handleEditAction = (id: string, title: string, color: string) => {
		editTag(dispatch, id, title, color);
	}

	const handleRemoveAction = (id: string) => {
		removeTag(dispatch, id);
	}

	return (
		<>
			<h1>Tag Manager</h1>
			<p><b>To add a tag</b> enter in a <b>title</b> and <b>hexadecimal color</b> in the top bar, and click <i>Add</i>.</p>
			<p><b>To edit a tag</b> click its <b>title</b> or <b>color</b> and type, save your changes by clicking <i>Edit</i> or revert to the tag's original title/color (before you started editing it) by clicking <i>Cancel</i>.</p>
			<p><b>To remove a tag</b> click its <i>Remove</i> button on the right.</p>
			<TagListItem isBar={true} addTagAction={handleAddAction} />
			{tags.map(tag =>
				<TagListItem key={tag.id} tag={tag}
					editTagAction={handleEditAction}
					removeTagAction={handleRemoveAction} />)}
		</>
	);
}

export default TagManager;

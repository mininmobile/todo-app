import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import SearchContext from "../contexts/SearchContext";
import { RootState } from "../store";
import { Tag } from "../reducers/tagReducer";

const TagSearchbar: React.FC = () => {
	const { searchQuery, setSearchQuery } = useContext(SearchContext);
	const tags = useSelector<RootState, Tag[]>(state => state.tags);

	const tagsFiltered = useMemo(() =>
		tags.filter(tag => searchQuery.tags.includes(tag.id!)), [tags, searchQuery.tags]);

	const handleClickTag = (tagId: string) =>
		setSearchQuery({ ...searchQuery, tags: searchQuery.tags.filter(x => x !== tagId) });

	return (
		<>
		{searchQuery.tags.length > 0 &&
			<div className="tag-searchbar">
				<div className="tag-searchbar__clear"
					onClick={() => setSearchQuery({ ...searchQuery, tags: [] })}>x</div>
				{tagsFiltered.map(tag =>
					<div key={tag.id} className="note-card__tag"
					onClick={() => handleClickTag(tag.id!)}
					style={{ background: "#" + tag.color }}>
						{tag.title}
						<div className="note-card__tag__remove">x</div>
					</div>)}
			</div>}
		</>
	);
}

export default TagSearchbar

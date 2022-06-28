import { ChangeEvent, useState } from "react";
import { Tag } from "../reducers/tagReducer";
import "./TagListItem.css";

interface TagListItemProps {
	// props for the taglistitem designated to create new tags
	isBar?: boolean,
	addTagAction?: (title: string, color: string) => void,
	// regular taglistitem props
	tag?: Tag,
	editTagAction?: (id: string, title: string, color: string) => void,
	removeTagAction?: (id: string) => void,
}

const TagListItem: React.FC<TagListItemProps> = ({ isBar, tag, editTagAction, removeTagAction, addTagAction }) => {
	const [active, setActive] = useState(isBar === true); // `=== true` converts bool? to bool
	const [title, setTitle] = useState(isBar ? "" : tag!.title!);
	const [color, setColor] = useState(isBar ? "" : tag!.color!);

	const handleCancel = (submitted = false) => {
		setActive(isBar === true);
		setTitle(isBar ? "" : (submitted ? title : tag!.title!));
		setColor(isBar ? "" : (submitted ? color : tag!.color!));
	}

	const handleSubmit = () => {
		if (title.length === 0 || color.length !== 6) // require color and title
			return;

		isBar ? addTagAction!(title, color)
			: editTagAction!(tag!.id!, title, color);

		handleCancel(true);
	}

	const handleRemove = () => {
		if (isBar)
			return;

		removeTagAction!(tag!.id!);
	}

	const handleFocus = () =>
		setActive(true);

	const handleBlur = () =>
		setActive(isBar === true || title !== tag!.title || color !== tag!.color);

	const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
		// only let the user type hexadecimal digits
		let value = e.currentTarget.value.replace(/[^0-9a-fA-F]/g, "");
		// let the use type and 'loop' the color
		if (value.length === 7)
			value = value.substring(1, 7);
		// ensure maximum of six digits
		if (value.length > 6)
			value = value.substring(0, 6);

		return setColor(value);
	}

	return (
		<div className={"tag-list-item " + (isBar ? "tag-list-bar " : "") + (active ? "active" : "")}>
			{/* title input field */}
			<input className="tag-list-item__input tag-list-item__input-title"
				type="text" placeholder="Tag"
				onFocus={handleFocus} onBlur={handleBlur}
				value={active ? title : tag!.title}
				onChange={(e) => setTitle(e.currentTarget.value)} />
			{/* color preview */}
			<div className="tag-list-item__color-preview"
				style={{ background: "#" + color.repeat(6).substring(0, 6) }}></div>
			{/* color input field */}
			<input className="tag-list-item__input tag-list-item__input-color"
				type="text" placeholder="Hex Color"
				onFocus={handleFocus} onBlur={handleBlur}
				value={active ? color : tag!.color}
				onChange={handleColorChange} />

			<div className="tag-list-item__buttons">
				{/* cancel button */}
				{ (isBar || active) && <div className="tag-list-item__button tag-list-item__button-cancel"
					onClick={() => handleCancel()}>{isBar ? "Clear" : "Cancel"}</div> }
				{/* submit button */}
				{ (isBar || active) && <div className="tag-list-item__button tag-list-item__button-submit"
					onClick={handleSubmit}>{isBar ? "Add" : "Edit"}</div> }

				{/* remove button */}
				{ (!isBar && !active) && <div className="tag-list-item__button tag-list-item__button-remove"
					onClick={handleRemove}>Remove</div> }
			</div>
		</div>
	);
}

export default TagListItem;
